class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Pass the message to the built-in Error constructor
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;
