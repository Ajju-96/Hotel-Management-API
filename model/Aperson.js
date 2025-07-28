const mongoose = require('mongoose');

const apersonSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['Manager', 'Staff', 'Chef', 'Cleaner'],
        required: true,
        default: 'Staff'
    },                                  
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

// Create a model from the schema
const Aperson = mongoose.model('Aperson', apersonSchema);   
module.exports = Aperson; // Export the model for use in other modules  