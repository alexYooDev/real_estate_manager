const Property = require('../models/Property');
const User = require('../models/User')

const createProperty =  async (req, res) => {
    const { 
        title, 
        description, 
        price, 
        location, 
        type, 
        area, 
        bedrooms, 
        bathrooms, 
        agent, 
        inspection,
        features, 
        status
    } = req.body;

    
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
            area,
            type, 
            bedrooms, 
            bathrooms,
            agent,
            features, 
            inspection,
            status
        });

        // update corresponding agent's property list
        await User.findByIdAndUpdate(agent, { $push: {propertiesListed: property._id}}, {new: true})
        
        res.status(201).json({
            id: property.id, 
            title: property.title, 
            description: property.description,
            price: property.price,
            location: property.location,
            area: property.area,
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            agent: property.agent,
            features: property.features,
            inspection: property.inspection || [],
            status: property.status
        });

    }  catch(error) {
        res.status(500).json({message: error.message });
    }
};

const getPropertiesAll = async (_, res) => {

    try {

    const properties = await Property.find();

        if (!properties) {
            return res.status(404).json({message: 'No properties found.'});
        }

    res.status(200).json(properties);
        
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

const getSavedProperties = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        
        const savedProperties = await Property.find({_id: { $in: user.savedProperties }})
        
        if (savedProperties) {
            return res.status(200).json(savedProperties);
        } else {
            return res.status(404).json({message: 'There is no saved property!'})
        }
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}

const searchProperty = async (req, res) => {
    
    const { price, location, type, bedrooms, bathrooms, status, agent } = req.query;

    let filter = {}


    let [minPrice, maxPrice] = price.split(",");
    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);

    if (location !== '') filter.location = {$regex: location, $options: "i"};
    if (type) filter.type = type;
    if (bedrooms) filter.bedrooms = bedrooms;
    if (bathrooms) filter.bathrooms = bathrooms;
    if (status !== '') filter.status = status;
    if (agent) filter.agent = agent;

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    try {
        const searchedProperty = await Property.find(filter);
        res.status(201).json(searchedProperty);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const updateProperty = async (req, res) => {

   try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedProperty) {
            return res.status(404).json({message: 'Property not found!'});
        } 
        
        return res.status(202).json(updatedProperty);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteProperty = async (req,res) => {

    const id = req.params.id

    try {
        await Property.findByIdAndDelete(id);
        res.status(200).json({message: "property deleted"});
    } catch(error) {
        res.status(500).json({message: "delete failed"});
    }
}

module.exports = {createProperty, getPropertiesAll, getSavedProperties, searchProperty, updateProperty, deleteProperty};