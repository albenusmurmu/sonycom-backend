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

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',                    // Local development
  'https://sonycom-frontend.onrender.com',
  'https://my-portfolio-9r9a.onrender.com'
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // If you use cookies or auth headers
}));

app.use(express.json()); // Parse JSON
app.use(logger);         // Custom logger middleware

// Routes with API versioning
app.use('/api/v1/contact', contactRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handler (after routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
