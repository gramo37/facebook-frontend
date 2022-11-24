const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    statusCode = 500;

    if(err.code ===  11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} entered.`
    }

    res.status(statusCode).json({
        success: false,
        message: err.message
    })
}

module.exports =  errorMiddleware;