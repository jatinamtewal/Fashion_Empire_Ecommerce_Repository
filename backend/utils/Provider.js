                // MBA BURGER WALA GOOGLE AUTH CODE
                
                
                
                
                // // import {Strategy as GoogleStrategy} from "passport-google-oauth20";
                // const GoogleStrategy = require("passport-google-oauth20");

                // // import passport from "passport";
                // const passport = require("passport");

                // // import User from "../models/userModel";
                // const User = require("../models/userModel");

                // // export const connectPassport = ()=>{
                // const connectPassport = ()=>{
                //     passport.use(new GoogleStrategy({
                //         clientID:process.env.GOOGLE_CLIENT_ID,
                //         clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                //         callbackURL:process.env.CLIENT_URL,
                //     },async function(accessToken,refreshToken,profile,next){
                //         // Database comes here 

                //         const user= await User.findOne({
                //             googleId:profile.id,
                //         });

                //         if(!user){
                //             const newUser= await User.create({
                //                 googleId:profile.id,
                //                 name:profile.displayName,
                //                 photo:profile.photos[0].value,
                //             });
                //         }else{
                //             return next(null,user);
                //         }
                //     }));

                //     passport.serializeUser((user,next)=>{
                //         next(null,user.id);
                //     });

                //     passport.deserializeUser(async(id,next)=>{
                //         const user = await User.findById(id);
                //         next(null,user);
                //     });

                // };

                // module.exports = connectPassport;