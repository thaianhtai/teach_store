const mongoose = require('mongoose');
require('dotenv').config(); // Đọc file .env
const { loadModels } = require('../models'); // Import hàm loadModels

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI không được thiết lập trong .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);

    // Load tất cả các model
    loadModels();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
