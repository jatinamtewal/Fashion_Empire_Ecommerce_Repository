const express = require("express");
const {newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder}=require("../controllers/orderController");
const router = express.Router();
const { isAuthenticated,authorizedRoles } = require("../middleware/auth");

// Create New Order
router.route("/order/new").post(isAuthenticated,newOrder);

// Get Single Order Details 
router.route("/order/:id").get(isAuthenticated,getSingleOrder);

// User Orders --User
router.route("/orders/me").get(isAuthenticated,myOrders);

// Get All Orders --Admin
router.route("/admin/orders").get(isAuthenticated,authorizedRoles("admin"),getAllOrders);

// Update Order Status / Delete Order--Admin
router.route("/admin/order/:id")
    .put(isAuthenticated,authorizedRoles("admin"),updateOrderStatus)
    .delete(isAuthenticated,authorizedRoles("admin"),deleteOrder);





module.exports =router;