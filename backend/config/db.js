// config/db.js
const mongoose = require("mongoose");

// Set strictQuery explicitly to suppress the warning
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://alxyoo95:FtjTxvNCmgHrYXVL@cluster0.bas9i.mongodb.net/realestatemanager?retryWrites=true&w=majority&appName=Cluster0'
    );  // Remove deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
