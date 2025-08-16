const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();


// Serve React build
app.use(express.static(path.join(__dirname, 'public')));

// // React Router fallback (for client-side routes)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Error handler (uncomment when you add back)
// app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
