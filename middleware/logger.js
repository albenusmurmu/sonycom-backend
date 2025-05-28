const logger = (req, res, next) => {
    const now = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;

    console.log(`[${now}] ${method} ${url} → Status: ${status}`);

    next();
};

module.exports = logger;
