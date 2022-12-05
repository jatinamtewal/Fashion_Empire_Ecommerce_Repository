const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb ID Error
    if(err.name ==="CastError"){
        console.log(`Resource not found: Invalid ${err.path}`);
        err= new ErrorHandler(message,400);
    }

    // Mongoose Duplicate Key Error
    if(err.code ===11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }

    // Wrong JWT Error
    if(err.name ==="JsonWebTokenError"){
        console.log(`JSON Web Token is Invalid, Try again `);
        err= new ErrorHandler(message,400);
    }

    // JWT Expired Error
    if(err.name ==="TokenExpiredError"){
        console.log(`JSON Web Token is Expired, Try again `);
        err= new ErrorHandler(message,400);
    }
    

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};