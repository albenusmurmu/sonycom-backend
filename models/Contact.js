// backend/models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty'],
    trim: true,
  },
  deadline: {
    type: Date,
    // This field is not required
  },
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true,
});

// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, the model 'Contact' is for the 'contacts' collection in the database.
module.exports = mongoose.model('Contact', contactSchema);