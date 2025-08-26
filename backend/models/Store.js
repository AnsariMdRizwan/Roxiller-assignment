const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
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
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  image: {
    type: String,
    default: '',
    trim: true
  },

  // ⭐ Add ratings
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who rated
      value: { type: Number, min: 1, max: 5 } // rating value
    }
  ],

  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 }
});

module.exports = mongoose.model('Store', storeSchema);
