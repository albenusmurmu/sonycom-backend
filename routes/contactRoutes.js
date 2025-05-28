const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/v1/contact
router.post('/', async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            res.status(400);
            return next(new Error('All fields are required'));
        }

        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!',
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Get all contact submissions (admin)
// @route   GET /api/v1/contact/admin/contacts
router.get('/admin/contacts', async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json({ success: true, contacts });
    } catch (error) {
        next(error);
    }
});

// @desc    Update contact status (admin)
// @route   PUT /api/v1/contact/admin/contacts/:id
router.put('/admin/contacts/:id', async (req, res, next) => {
    try {
        const { status } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedContact) {
            res.status(404);
            return next(new Error('Contact not found'));
        }

        res.json({ success: true, contact: updatedContact });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
