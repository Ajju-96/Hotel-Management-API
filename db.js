const mongoose = require('mongoose');
require("dotenv").config(); 

// const mongoURI = 'mongodb://localhost:27017/taj_hotel';
const mongoURI = process.env.MONGO_URL; // Use environment variable or fallback to local MongoDB


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoSelectFamily: false,
  serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

db.on('disconnected', () => {
    console.log('MongoDB connection disconnected'); 
});

db.on('reconnected', () => {
    console.log('MongoDB connection reestablished');    
}); 

db.on('connecting', () => {
    console.log('MongoDB connection is being established');
});

module.exports = db; // Export the db connection for use in other modules
