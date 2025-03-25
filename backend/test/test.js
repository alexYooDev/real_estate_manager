const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const Property = require('../models/Property');
const User = require('../models/User');

const {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
  getUserDetail,
} = require('../controllers/authController');

const {
  createProperty,
  getPropertiesAll,
  searchProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const User = require('../models/User');

const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;

// Mock property response
const propRes = {
  status: sinon.stub().returnsThis(),
  json: sinon.spy(),
};

// Mock property request
const propReq = {
  body: {
    title: 'Property Title',
    description: 'Property Description',
    price: 100000,
    location: 'Location',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    agent: 'agent_id',
    status: 'available',
  },
  params: {},
};

//test property functions
describe('Property Controller - createProperty', () => {
  it("should create a property and update the agent's property list", async () => {
    const mockAgent = {
      _id: 'agent_id',
      propertiesListed: [],
    };

    const mockProperty = {
      _id: 'property_id',
      title: 'Property Title',
      description: 'Property Description',
      price: 100000,
      location: 'testLocation',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 1,
      agent: 'agent_id',
      status: 'available',
    };

    // Mock User and Property model methods
    const findByIdStub = sinon.stub(User, 'findById').resolves(mockAgent);
    const createStub = sinon.stub(Property, 'create').resolves(mockProperty);
    const findByIdAndUpdateStub = sinon
      .stub(User, 'findByIdAndUpdate')
      .resolves(mockAgent);

    await createProperty(propReq, propRes);

    // Check that the response was sent with the correct status and data
    expect(propRes.status.calledWith(201)).to.be.true;

    expect(
      propRes.json.calledWith({
        id: mockProperty.id,
        title: mockProperty.title,
        description: mockProperty.description,
        price: mockProperty.price,
        location: mockProperty.location,
        type: mockProperty.type,
        bedrooms: mockProperty.bedrooms,
        bathrooms: mockProperty.bathrooms,
        agent: mockProperty.agent,
        status: mockProperty.status,
      })
    ).to.be.true;

    // Ensure that the agent's properties list was updated
    expect(
      User.findByIdAndUpdate.calledWith(
        'agent_id',
        { $push: { propertiesListed: mockProperty._id } },
        { new: true }
      )
    ).to.be.true;

    findByIdStub.restore();
    createStub.restore();
    findByIdAndUpdateStub.restore();
  });

  it('should return 404 if agent does not exist', async () => {
    findByIdStub = sinon.stub(User, 'findById').resolves(null); // Simulate agent not found

    await createProperty(propReq, propRes);

    expect(propRes.status.calledWith(404)).to.be.true;
    expect(propRes.json.calledWith({ message: 'Agent not found!' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 if there is a server error', async () => {
    const errorMessage = 'Database error';
    findByIdStub = sinon
      .stub(User, 'findById')
      .rejects(new Error(errorMessage));

    await createProperty(propReq, propRes);

    expect(propRes.status.calledWith(500)).to.be.true;
    expect(propRes.json.calledWith({ message: errorMessage })).to.be.true;

    findByIdStub.restore();
  });
});

describe('Update Property Function Test', () => {
  it('should update a property', async () => {
    propReq.params.id = 'property_id';
    propReq.body = { title: 'Updated Property Title' };

    findByIdAndUpdateStub = sinon
      .stub(Property, 'findByIdAndUpdate')
      .resolves({ acknowledged: true });

    await updateProperty(propReq, propRes);

    expect(propRes.status.calledWith(202)).to.be.true;

    findByIdAndUpdateStub.restore();
  });

  it('should return 404 if property not found', async () => {
    findByIdAndUpdateStub = sinon
      .stub(Property, 'findByIdAndUpdate')
      .resolves(null);

    await updateProperty(propReq, propRes);

    expect(propRes.status.calledWith(404)).to.be.true;

    findByIdAndUpdateStub.restore();
  });

  it('should return 500 on error', async () => {
    const errorMessage = 'DB Error';

    findByIdAndUpdateStub = sinon
      .stub(Property, 'findByIdAndUpdate')
      .throws(new Error(errorMessage));

    const propReq = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const propRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await updateProperty(propReq, propRes);

    expect(propRes.status.calledWith(500)).to.be.true;
    expect(propRes.json.calledWith({ message: errorMessage })).to.be.true;

    findByIdAndUpdateStub.restore();
  });
});

describe('Get Property Function Test', () => {
  it('should return all properties for all the users', async () => {
    const findStub = sinon
      .stub(Property, 'find')
      .resolves([{ id: 'property_id', title: 'Test Houses' }]);

    await getPropertiesAll({}, propRes);

    expect(propRes.status.calledWith(200)).to.be.true;

    findStub.restore();
  });

  it('should return 500 if getting all properties fails', async () => {
    const errorMessage = 'Database error';

    findStub = sinon.stub(Property, 'find').resolves(null);

    await getPropertiesAll({}, propRes);

    expect(propRes.status.calledWith(500)).to.be.true;
    expect(propRes.json.calledWith({ message: errorMessage })).to.be.true;

    findStub.restore();
  });
});

describe('searchProperty', () => {
  it('should filter properties', async () => {
    propReq.query = { location: 'Brisbane', price: '200000,500000' };
    const mockProperties = [{ title: 'Test filter houses' }];

    findStub = sinon.stub(Property, 'find').resolves(mockProperties);

    await searchProperty(propReq, propRes);

    expect(propRes.json.calledWith(mockProperties)).to.be.true;
    expect(propRes.status.calledWith(201)).to.be.true;

    findStub.restore();
  });
});

describe('DeleteTask Function Test', () => {
  it('should delete a property', async () => {
    propReq.body._id = 'property123';
    const deleteOneStub = sinon
      .stub(Property, 'deleteOne')
      .resolves({ deletedCount: 1 });

    await deleteProperty(propReq, propRes);

    expect(propRes.json.calledWith({ message: 'property deleted' })).to.be.true;

    deleteOneStub.restore();
  });

  it('should return 500 if property deletion fails', async () => {
    deleteOneStub = sinon.stub(Property, 'deleteOne').throws();

    await deleteProperty(propReq, propRes);

    expect(propRes.status.calledWith(500)).to.be.true;
    expect(propRes.json.calledWith({ message: 'delete failed' })).to.be.true;

    deleteOneStub.restore();
  });
});
