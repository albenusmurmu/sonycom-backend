const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'unread', enum: ['unread', 'read', 'replied'] }
});

module.exports = mongoose.model('Contact', contactSchema);
