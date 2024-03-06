function appError(message, statusCode) {
    const error = new Error(message);

    error.statusCode = statusCode || 500; // Set a default status code if not provided
    error.status = `${error.statusCode}`.startsWith('4') ? 'fail' : 'error';
    error.isOperational = true;

    // Error.captureStackTrace(error, appError); // Correctly capture stack trace

    return error;
}

module.exports = appError;
