const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;


// Create Product --Admin
exports.createProduct = catchAsyncErrors( async (req,res,next)=>{
    

    let images=[];
    
    if(typeof(req.body.images)==="string"){
        images.push(req.body.images);
    }else{
        images= req.body.images;
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i],{
            folder:"products"
        });

        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url,
        });
    }

    req.body.images=imagesLink;
    req.body.user= req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product        
    })

});


// Get All Products
exports.getAllProducts= catchAsyncErrors(
    async(req,res,next)=>{
        const resultPerPage = 8;
        const productsCount= await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter();
        // .pagination(resultPerPage);

        let products = await apiFeature.query;

        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);

         products= await apiFeature.query.clone();
        res.status(200).json(
            {
                success:true,
                products,
                productsCount,
                resultPerPage,
                filteredProductsCount,
            }
        );
    }
);

// Get Single Product 
exports.getProductDetails = catchAsyncErrors(
    async(req,res,next)=>{

        const product =await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler("Product Not Found",500));
        }
    
        res.status(200).json({
            success:true,
            product
        })
    
    }
);

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

  
// Update Product -- Admin
exports.updateProduct= catchAsyncErrors(
    async (req,res,next)=>{
    
        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler("Product Not Found",500));
        }

        let images=[];
    
        if(typeof(req.body.images)==="string"){
            images.push(req.body.images);
        }else{
            images= req.body.images;
        }

        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
              await cloudinary.uploader.destroy(product.images[i].public_id);
            }
        
            const imagesLinks = [];
        
            for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
              });
        
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }
        
            req.body.images = imagesLinks;
          }

        product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
        res.status(200).json({
            success:true,
            product
        })
    }
);



// Delete A Product --Admin
exports.deleteProduct = catchAsyncErrors(
    async (req,res,next)=>{
        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler("Product Not Found",500));
        }
    
        // Deleting images on Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
            
        }
        await product.remove();
    
        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully"
        })
    }
);



// Create or Update Product Review
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{

    const {rating,comment,productId} =req.body;

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(    //function for checking reviews
        (rev)=> rev.user.toString() ===req.user._id.toString()
    );

    if(isReviewed){               //Checking if the product is to be update or not
        product.reviews.forEach((rev) => {
            if(rev.user.toString() ===req.user._id.toString()){
                rev.rating=rating,
                rev.comment=comment
            }

            });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg =0;                 //Updating overall Rating of the product by its average
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    })
    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        message:"Product Reviewed Successfully"
    });

});


// Get All Reviews of a Single Product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
});


// Delete Reviews
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);
    
    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    
    const reviews = product.reviews.filter(
        (rev)=>rev._id.toString()!== req.query.id.toString()
    );
 
    
    let avg =0;                 //Updating overall Rating of the product by its average
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    });

    let ratings = 0;

    if(reviews.length ===0){
        ratings=0;
    }else{
        ratings=avg/reviews.length;
    }
       
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
        reviews,ratings,numOfReviews,
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    );

    res.status(200).json({
        success:true,
    });
});