const mongoose = require('mongoose');
const User = require('./User');

const propertySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['for sale', 'for rent', 'pending', 'sold'],
    required: true,
  },
  location: { type: String, required: true },
  features: [{ type: String, default: [] }],
  area: { type: Number, required: true, min: 0 },
  type: {
    type: String,
    enum: ['apartment', 'house', 'office'],
    required: true,
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inspection: [{ type: Date, default: [] }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', propertySchema);