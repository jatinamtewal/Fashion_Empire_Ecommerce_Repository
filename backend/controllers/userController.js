const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;


// Register a User
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    // console.log(req.body.avatar);
    const myCloud = await cloudinary.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    });
    
    const {name,email,password,avatar} = req.body;
    
    const user = await User.create({
    name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    sendToken(user,201,res);
    
});


// Login User
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{

    const  { email, password}  =req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and Password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    sendToken(user,201,res);
});


// Logout User
exports.logoutUser=catchAsyncErrors(async (req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    // Finding User
    const user= await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    // Get Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message =`Your password reset token is :- /n/n ${resetPasswordUrl} /n/nIf you have not requested this email then, please ignore it `;

    try {
        await sendEmail({
            email:user.email,
            subject:`Fashion Empire Password Recovery`,
            message
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }

});


// Reset Password
exports.resetPassword=catchAsyncErrors(async (req,res,next)=>{

    // Creating Token Hash
    const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt :Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not Match",400));
    }
    
    user.password = req.body.password;

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);
});


// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{

    const user =await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
});


// Update Password of the User
exports.updatePassword= catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await(user.comparePassword(req.body.oldPassword));

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't Match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});


// Update Profile of the User
exports.updateProfile= catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    // We will add Cloudinary Later 
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true
    });
});


// Get All Users --Admin
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{

    const users= await User.find();

    res.status(200).json({
        success:true,
        users
    })
});

// Get Single User Detail --Admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User doesn't exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user
    });
});


// Update Role of the User --Admin
exports.updateUserRole= catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    // We will add Cloudinary Later 

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true
    });
});

// Delete User --Admin
exports.deleteUser= catchAsyncErrors(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400));
    }

    const imageId = user.avatar.public_id;
    
    await cloudinary.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    });
});
