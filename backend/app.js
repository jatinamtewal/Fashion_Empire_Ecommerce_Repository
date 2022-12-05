const express = require("express");
const app=express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
// import { connectPassport } from "./utils/Provider";
const connectPassport = require("./utils/Provider");
// const session=require("express-session");                //mba burger wala googleoauth
// const passport=require("passport");                      // mba burger wala googleoauth

const errorMiddleware =require("./middleware/error");
const path = require("path");



// config

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(fileUpload());


                // // Using Session Middleware                          //mba burger wala googleoauth
                // app.use(session({
                //     secret:process.env.SESSION_SECRET,
                //     resave:false,
                //     saveUninitialized:false
                // }));

                // app.use(passport.authenticate("session"));
                // app.use(passport.initialize());
                // app.use(passport.session());

                // connectPassport();

// Routes Import
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");
// const authRoutes=require("./routes/auth");    //codewolves


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
});

// app.use("/auth",authRoutes);         //codewolves
// Middleware for Errors
app.use(errorMiddleware);

module.exports=app;