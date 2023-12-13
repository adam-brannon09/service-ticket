const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
// import the error handler
const { errorHandler } = require('./middleware/errorMiddleware');
// Import the database connection
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();
// Initialize the express app
const app = express();
// Middleware to send JSON data to the server
app.use(express.json());
// Middleware to parse the URL-encoded data from the server
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running...');
}
);

// Import the routes
app.use('/api/users', require('./routes/userRoutes'));
// Initialize the error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));