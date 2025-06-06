// backend/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import the model

// @route   POST api/contact
// @desc    Receive and store a new contact form submission
// @access  Public
router.post('/', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { name, email, phone, countryCode, message, deadline } = req.body;

    // Basic validation to check if required fields are present
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ msg: 'Please enter all required fields.' });
    }

    // Create a new contact instance using the Mongoose model
    const newContact = new Contact({
      name,
      email,
      phone,
      countryCode,
      message,
      deadline: deadline || null, // Handle optional deadline
    });

    // Save the new contact to the database
    const savedContact = await newContact.save();

    // Send a success response
    res.status(201).json({ 
      msg: 'Your message has been sent successfully!', 
      contact: savedContact 
    });

  } catch (err) {
    console.error(err.message);
    // Handle potential validation errors or server errors
    if(err.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Validation Error', errors: err.errors });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;