const catchAsyncErrors = require("../errorMiddleware/catchAsyncErrors");
const ErrorHandler = require("../errorMiddleware/errorHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {authToken} = req.cookies;
    console.log(authToken);
    if(!authToken) {
        return (next (new ErrorHandler("Please Login to access this utility.", 404)))
    }
    const decoded = await jwt.verify(authToken, process.env.SECRETKEY);
    
    req.user = await userModel.findById(decoded.id);   
    if(!req.user) {
        return (next(new ErrorHandler("User Not Found", 404)));
    }

    next()
})

// module.exports = isAuthenticatedUser;