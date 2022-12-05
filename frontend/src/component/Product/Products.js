import React, { Fragment, useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import "./Product.css";
import { clearErrors,getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const categories = [
    "New Launches",
    "Winter",
    "Summer",
    "Autumn",
    "Rainy",
  ];




const Products = () =>{

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products);
    const params = useParams();
    const keyword = params.keyword;
    // console.log(keyword);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    let count = filteredProductsCount;
    // let count = productsCount;

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);


    return (
    <Fragment>
        {loading ? (<Loader/>):
        (<Fragment>
            <MetaData title="PRODUCTS - FASHION EMPIRE" />
            <h2 className="productsHeading">Products</h2>

            <div className="products">
                {products &&
                products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                />


                <Typography>Categories</Typography>
                <ul className="categoryBox">
                {categories.map((category) => (
                    <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                    >
                    {category}
                    </li>
                ))}
                </ul>

                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                        setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="on"
                        min={0}
                        max={5}
                    />
                </fieldset>

            </div>

            {resultPerPage < count && (
                <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    // totalItemsCount={filteredProductsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
                </div>
            )}
        </Fragment>
        )}
    </Fragment>

)};


export default Products;