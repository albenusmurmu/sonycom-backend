const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Allowed frontend domains
const allowedOrigins = [
  'http://localhost:3000',                    // Local development
  'https://sonycom-frontend.onrender.com',
  'https://my-portfolio-9r9a.onrender.com'
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());    // Body parser
app.use(logger);            // Logger middleware

// API Routes
app.use('/api/v1/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
