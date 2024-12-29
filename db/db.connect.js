const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;

const initialiseDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoUri);

    if (connection) {
      console.log('Connected to database');
    } else {
    }
  } catch (error) {
    console.log('Connection failed', error);
  }
};

module.exports = { initialiseDatabase };
