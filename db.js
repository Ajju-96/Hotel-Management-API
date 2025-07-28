const mongoose = require('mongoose');

// const mongoURI = 'mongodb://localhost:27017/TajHotel'; // Replace 'yourdbname' with your database name
const mongoURI = process.env.URI; // Use environment variable or fallback to local MongoDB



mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

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
