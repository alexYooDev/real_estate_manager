const mongoose = require('mongoose');
const Property = require('../models/Property'); // Adjust path based on your project structure
const fs = require('fs');
const connectDB = require('../config/db');


const populateDB = async () => {
  try {
    // Connect to MongoDB
    connectDB();

    // Load property data from JSON file
    const propertyData = JSON.parse(
      fs.readFileSync('./brisbane_properties.json', 'utf-8')
    );

    await Property.deleteMany({})

    // Insert new data
    await Property.insertMany(propertyData);

    console.log('Database populated with example property posts');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
    mongoose.connection.close();
  }
};

populateDB();
