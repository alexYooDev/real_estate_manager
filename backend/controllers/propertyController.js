const Property = require('../models/Property');
const User = require('../models/User')

const createProperty =  async (req, res) => {
    const {title, description, price, location, type, bedrooms, bathrooms, images, agent, status } = req.body;
    
    try {

        const agentExist = await User.findById(agent);

        if (!agentExist) {
            return res.status(404).json({message: "Agent not found!"});
        }

        const property = await Property.create({
            title, 
            description, 
            price, 
            location, 
            type, 
            bedrooms, 
            bathrooms,
            images, 
            agent, 
            status
        });
        
        res.status(201).json({
            id: property.id, 
            title: property.title, 
            description: property.description,
            price: property.price,
            location: property.location,
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            images: property.images,
            agent: property.agent,
            status: property.status
        });

    }  catch(error) {
        res.status(500).json({message: error.message });
    }
};

const getPropertiesAll = async (_, res) => {
    const properties = await Property.find();

    if (!properties) {
        res.status(404).json({message: 'No properties found.'});
    }

    res.status(200).json(properties);

    try {
        
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const updateProperty = async (req, res) => {
     
     try {
        const updatedProperty = await Property.replaceOne(
          { _id: req.params.id },
          req.body,
          { new: true }
        );

        if (!updatedProperty) {
            res.status(404).json({message: 'Property not found!'});
        }
        res.status(202).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProperty = async (req,res) => {

    const id = req.body._id
    try {
        const propertyToDelete = await Property.deleteOne({_id: id});

        res.json({message: "property deleted"});
    } catch(error) {
        res.status(500).json({message: "delete failed"});
    }
}

module.exports = {createProperty, getPropertiesAll, updateProperty, deleteProperty};