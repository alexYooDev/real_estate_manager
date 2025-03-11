const Property = require('../models/Property');
const User = require('../models/User')

const createProperty =  async (req, res) => {
    const {title, description, price, location, type, bedrooms, bathrooms, agent, status } = req.body;
    
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
            agent: property.agent,
            status: property.status
        });

    }  catch(error) {
        res.status(500).json({message: error.message });
    }
};

// const getProperties = async (req, res) => {
//     const {title, description, price, location, type, bedrooms, bathrooms, agent, status } = red.body;

//     try {
        
//     } catch(error) {
//         res.status(500).json({message: error.message});
//     }
// }

module.exports = {createProperty};