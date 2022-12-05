const express=require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, createProductReview, deleteReview, getProductReviews, getProductDetails, getAdminProducts } = require("../controllers/productController");
const { isAuthenticated,authorizedRoles } = require("../middleware/auth");

const router=express.Router();

// Get All Products
router.route("/products").get(getAllProducts);

// Create New Product --Admin
router
    .route("/admin/product/new")
    .post(isAuthenticated,authorizedRoles("admin"),createProduct);

// Update/Delete Product --Admin
router.route("/admin/product/:id")
    .put(isAuthenticated,authorizedRoles("admin"),updateProduct)
    .delete(isAuthenticated,authorizedRoles("admin"),deleteProduct);

// Get All Products --Admin
router
    .route("/admin/products")
    .get(isAuthenticated, authorizedRoles("admin"), getAdminProducts);

// Get Single Product
router.route("/product/:id").get(getProductDetails);

// Product Review -- Authenticated
router.route("/review").put(isAuthenticated,createProductReview);

// Delete Review -- Authenticated
router.route("/reviews").get(getProductReviews).delete(isAuthenticated,deleteReview);

module.exports=router;