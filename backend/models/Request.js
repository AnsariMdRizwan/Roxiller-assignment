const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Store name is required'],
        trim: true,

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,

    },
    image: {
        type: String,
        default: '', // optional field
        trim: true
    }
});

module.exports = mongoose.model('Requests', requestSchema);
