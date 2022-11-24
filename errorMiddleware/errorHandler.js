class ErrorHandler extends Error {
    constructer(message) {
        this.message = message;
    }
}

module.exports = ErrorHandler;