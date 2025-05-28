const errorHandler = (err, req, res, next) => {
    // Default to 500 if statusCode is not set
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞 Hidden in production',
    });

    // Optional console log for all environments
    console.error(`[Error] ${err.message}\n${err.stack}`);
};

module.exports = errorHandler;
