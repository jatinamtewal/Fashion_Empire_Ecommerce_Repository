import React, { Fragment, useEffect,useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector,useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
// import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {addItemsToCart} from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () =>{
    const dispatch = useDispatch();
    const alert = useAlert();

    const {productDetails, loading,error} = useSelector((state)=> state.productDetails);
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
    
    const params = useParams();
    // console.log((params.id));


    
    const options = {
        size:"large",
        value:productDetails.ratings,
        readOnly:true,
        precision:0.5,
      };
      
      const [quantity,setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");
      
      const increaseQuantity = () =>{
        if(productDetails.Stock <= quantity) return ;
        const qty = quantity + 1;
        setQuantity(qty);
      };
      
      const decreaseQuantity = () =>{
        if(1>=quantity) return ;
        const qty = quantity - 1;
        setQuantity(qty);
      };

      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };

      const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item Added To Cart");
      };
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

      useEffect(()=>{
          if(error){
              alert.error(error);
              dispatch(clearErrors());
          }
          if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
          }
          dispatch(getProductDetails(params.id))
      },[dispatch,params.id,error,alert,reviewError,success]);

      // console.log(productDetails);

    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <Fragment>
                  <MetaData title={`${productDetails.name} - FASHION EMPIRE`} />
                <div className="ProductDetails">
                    <div>
                        <Carousel> 
                           {productDetails.images && productDetails.images.map((item,i)=>(
    
                                    <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                                 
                            ))} 
                        </Carousel> 
                    </div>
                    <div>
                  <div className="detailsBlock-1">
                    <h2>{productDetails.name}</h2>
                    <p>Product # {productDetails._id}</p>
                  </div>
                  <div className="detailsBlock-2">
                    <Rating {...options} />
                    <span className="detailsBlock-2-span">
                      {" "}
                      ({productDetails.numOfReviews} Reviews)
                    </span>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₹${productDetails.price}`}</h1>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                      <button disabled={productDetails.stock <1 ? true:false} onClick={addToCartHandler}>
                        Add to Cart
                      </button>
                    </div>
    
                    <p>
                      Status:
                      <b className={productDetails.Stock < 1 ? "redColor" : "greenColor"}>
                        {productDetails.Stock < 1 ? " OutOfStock" : " InStock"}
                      </b>
                    </p>
                  </div>
                  <div className="detailsBlock-4">
                    Description : <p>{productDetails.description}</p>
                  </div>
    
                  <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                  </button>
                </div>
            </div>
    
            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
    
            {productDetails.reviews && productDetails.reviews[0]?(
                <div className="reviews">
                    {productDetails.reviews && productDetails.reviews.map((review)=><ReviewCard review ={review}/>)}
                </div>
            ):(
                <p className="noReviews">No Reviews Yet</p>
            )};
            </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails;