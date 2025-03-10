const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    location: {type: String, required: true},
    type: {type: String, enum: ['apartment', 'house', 'office'], required: true },
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required:true},
    images: [{type: String}],
    agent: {type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
    status: {type: String, enum: ['for sale', 'pending', 'sold'], required:true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = propertySchema;