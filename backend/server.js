const express = require('express');
const dotenv = require('dotenv').config();
// import the error handler
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 8000;
const app = express();

// Middleware to send JSON data to the server
app.use(express.json());
// Middleware to parse the URL-encoded data from the server
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running...');
}
);

app.use('/api/users', require('./routes/userRoutes'));
// Initialize the error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));