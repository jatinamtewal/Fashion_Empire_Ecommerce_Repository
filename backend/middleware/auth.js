const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// For Checking that the user is logged in or not
exports.isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please to login to access this Resource",401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

// For Checking that the user is Admin or not
exports.authorizedRoles = (...roles)=>{
 return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403));
        
    }

    next();
 }
    
} 

// New Code for Google Authentication Open

// New Code for Google Authentication Close


