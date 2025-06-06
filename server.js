// backend/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import your custom modules
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// --- Initialize App and Connect to DB ---
const app = express();
connectDB(); // Call the function to connect to the database

const PORT = process.env.PORT || 5001;

// --- Middleware ---

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Body Parser Middleware
app.use(express.json());

// Custom Logger Middleware
// This should be one of the first middleware to run
app.use(logger);


// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Use the contact routes
app.use('/api/contact', require('./routes/contactRoutes'));


// --- Custom Error Handler Middleware ---
// This MUST be the last piece of middleware
app.use(errorHandler);


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});