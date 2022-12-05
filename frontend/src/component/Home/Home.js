import React, { Fragment,useEffect} from "react";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {loading,error,products}=useSelector(
    (state)=>state.products
  );

  useEffect(()=>{

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  },[dispatch,error,alert]);

  return (
    <Fragment>
      {loading ? (<Loader/>):
      (<Fragment>
      <MetaData title="FASHION EMPIRE" />
          <div className="banner">
            <p>Welcome to FASHION EMPIRE</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll 
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
           
           {products && products.map((product)=>
              <Product  product={product}/>
           )}
                   
          </div>
          <ul className="newlink">
            <li>
              <NavLink to="/products">View More Amazing Products...</NavLink>
            </li>
          </ul> 
        </Fragment>)}
    </Fragment>
  );
};

export default Home;
