// Desc: Middleware for handling errors
const errorHandler = (err, req, res, next) => {
    // Set the status code to 500 if the status code is not set
    const statusCode = res.statusCode ? res.statusCode : 500
    // Set the status code to 500 if the status code is not set
    res.status(statusCode)
    // Send the error message in JSON format
    res.json({
        // Set the error message to the error message passed in
        message: err.message,
        // Only send the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
// Export the error handler
module.exports = { errorHandler }