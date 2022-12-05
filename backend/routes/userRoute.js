const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser,  } = require("../controllers/userController");
const { isAuthenticated,authorizedRoles } = require("../middleware/auth");
const router=express.Router();
// const passport= require("passport");                     //mbaburgerwala googleoauth
// const myProfile = require("../controllers/user");

// New code for google login from mbaburgerwala
        // router.get("/googlelogin",passport.authenticate("google",{
        //     scope:["profile"],
        // })
        // );

        // router.get("/login",
        // passport.authenticate("google"),(req,res,next)=>{
        //     res.send("LOgged IN");
        // }
        // // passport.authenticate("google",{
        // //     scope:["profile"],
        //     // successRedirect:process.env.FRONTEND_URL,
            
        // // })
        // );


        // router.get("/me",myProfile);
// close


// Create a User
router.route("/register").post(registerUser);

// Login User
router.route("/login").post(loginUser);

// Forgot Password
router.route("/password/forgot").post(forgotPassword);

// Reset Password
router.route("/password/reset/:token").put(resetPassword);

// Logout User
router.route("/logout").get(logoutUser);

// Get User Details After Authentication --User
router.route("/me").get(isAuthenticated,getUserDetails);

// Update Password
router.route("/password/update").put(isAuthenticated,updatePassword);

// Update Profile
router.route("/me/update").put(isAuthenticated,updateProfile);

// Get All Users --Admin
router.route("/admin/users").get(isAuthenticated,authorizedRoles("admin"),getAllUsers);

// Get All Users --Admin
router.route("/admin/user/:id")
    .get(isAuthenticated,authorizedRoles("admin"),getSingleUser)
    .put(isAuthenticated,authorizedRoles("admin"),updateUserRole)
    .delete(isAuthenticated,authorizedRoles("admin"),deleteUser);

module.exports = router;