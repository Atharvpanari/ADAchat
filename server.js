require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

// Import our custom modules
const connectDB = require('./config/db');
const sessionConfig = require('./config/session');

const app = express();

// Connect to Database
connectDB();

// Security & Parsing Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Management (24h Logout)
app.use(sessionConfig);

// Basic Test Route
app.get('/', (req, res) => {
    res.send('Secure Server logic is now separated and running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});