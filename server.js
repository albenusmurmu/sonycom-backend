const express = require('express');
const cors = require('cors');
require('dotenv').config(); // 👈 Load .env

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB(); // Uses MONGO_URI from .env

// Allowed frontend domains
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5501',
  'https://sonycom-backend.onrender.com',
  'https://my-portfolio-g1uw.onrender.com',
  'https://sonycom-frontend.onrender.com' // ✅ Correct live frontend domain
];

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin === "null") {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/v1/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
