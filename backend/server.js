const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const path = require('path');
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

// app.get('/', (req, res) => {
//     res.send('API is running...');
// }
// );

// Import the user routes
app.use('/api/users', require('./routes/userRoutes'));
// Import the ticket routes
app.use('/api/tickets', require('./routes/ticketRoutes'));
// Initialize the error handler

//serve frontend (build folder) if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' });
    });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));