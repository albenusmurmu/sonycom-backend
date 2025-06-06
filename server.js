// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the .env file variables

const app = express();
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001

// --- Middleware ---

const allowedOrigins = [
'http://localhost:3000', // For local development
process.env.FRONTEND_URL  // For the deployed site on Render
];
// CORS: Allows cross-origin requests from your React app
app.use(cors({
origin: function (origin, callback) {
// allow requests with no origin (like mobile apps or curl requests)
if (!origin) return callback(null, true);
if (allowedOrigins.indexOf(origin) === -1) {
const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
return callback(new Error(msg), false);
}
return callback(null, true);
}
}));

app.use(express.json());

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.error('MongoDB Connection Error:', err));

// --- API Routes ---
app.get('/', (req, res) => {
res.send('API is running...');
});

// Use the contact routes we defined
app.use('/api/contact', require('./routes/contactRoutes'));

// --- Start the Server ---

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
}); 