const app = require("./app");

// const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const connectDatabase = require("./config/database"); 
                // const cors = require("cors");         //mbaburgerwala google oauth
                // const passport = require("passport");
                // const cookieSession = require("cookie-session");

                // New Start                //mba burger wala google oauth
                // app.use(
                // 	cookieSession({
                // 		name: "session",
                // 		keys: ["fashionempire"],
                // 		maxAge: 24 * 60 * 60 * 1000,
                // 	})
                // );


                // app.use(passport.initialize());
                // app.use(passport.session());

                // app.use(
                // 	cors({
                // 		origin: "http://localhost:3000",
                // 		methods: "GET,POST,PUT,DELETE",
                // 		credentials: true,
                // 	})
                // );
                // End


// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to the uncaught Exception");
    process.exit(1);
})

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}


// new thing open
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
// app.get("/config",(req,res) =>{
//     res.send({
//         publishableKey:process.env.STRIPE_API_KEY,
//     });
// });

// app.post("/create-payment-intent",async (req,res)=>{
//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             currency:"inr",
//             automatic_payment_methods:{
//                 enabled:true,
//             },
//             amount:2099,
//         });
    
//         res.send({ clientSecret:paymentIntent.client_secret });
        
//     } catch (error) {
//         return res.status(400).send({
//             error:{
//                 message:error.message,
//             },
//         })
//     }
// });


// new thing close


// Connecting to database

connectDatabase();

// Connecting with cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


const server =app.listen(process.env.PORT,()=>{
    console.log(`Server is started on the Port : http://localhost:${process.env.PORT}`);
})


// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to the Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
});