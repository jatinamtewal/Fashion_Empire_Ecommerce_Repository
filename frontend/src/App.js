
import './App.css';
import Header from "./component/layout/Header/Header.js";
// eslint-disable-next-line
import {useState ,useEffect } from 'react';
import {Routes,Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from 'axios';
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";

import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";


function App() {
  const {isAuthenticated,user} = useSelector(state=>state.user);
  
  // New Code codewolves
  // const [guser,setGUser]=useState(null);
  // const getUser = async () => {
	// 	try {
	// 		const url = `http://localhost:3000/auth/login/success`;
	// 		const { data } = await axios.get(url, { withCredentials: true });
	// 		setGUser(data.guser._json);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// useEffect(() => {
	// 	getUser();
	// }, []);

  // End

    // const [stripeApiKey, setStripeApiKey] = useState("");

    // async function getStripeApiKey() {
    //   const { data } = await axios.get("/api/v1/stripeapikey");

    //   setStripeApiKey(data.stripeApiKey);
    //   console.log(stripeApiKey);
    // }
  
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },
    });

    store.dispatch(loadUser());


    // getStripeApiKey();
  },[]);


  window.addEventListener("contextmenu",(e)=> e.preventDefault());
  return (<>
      <Header />
      {isAuthenticated && <UserOptions user={user}/>}
{/* 
      {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
        <Route path="/process/payment" element={<Payment/>} />
      </Elements>)} */}

      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/product/:id" element={<ProductDetails/>}/>
          <Route exact path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route exact path="/search" element={<Search/>}/>
          {/* Logged In User Routes */}

          
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile/>} />
            <Route path="/me/update" element={<UpdateProfile/>} />
            <Route path="/password/update" element={<UpdatePassword/>} />
            <Route path="/login/shipping" element={<Shipping/>} />
            <Route path="/order/confirm" element={<ConfirmOrder/>} />
            {/* {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}> */}
              {/* </Elements>)} */}
            <Route path="/process/payment" element={<Payment/>} />
            <Route path="/success" element={<OrderSuccess/>} />
            <Route path="/orders" element={<MyOrders/>} />
            <Route path="/order/:id" element={<OrderDetails/>} />
            {/* <Route path="/admin/dashboard" element={<Dashboard/>} /> */}
          </Route>

          {/* Admin Routes */}

          <Route element={<ProtectedRoute adminRoute={true} isAdmin={true}  />}>
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/products" element={<ProductList/>} />
            <Route path="/admin/product" element={<NewProduct/>} />
            <Route path="/admin/product/:id" element={<UpdateProduct/>} />
            <Route path="/admin/orders" element={<OrderList/>} />
            <Route path="/admin/order/:id" element={<ProcessOrder/>} />
            <Route path="/admin/users" element={<UsersList/>} />
            <Route path="/admin/user/:id" element={<UpdateUser/>} />
            <Route path="/admin/reviews" element={<ProductReviews/>} />
          </Route>
          



          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
          <Route exact path="/login" element={<LoginSignUp/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
      </>
  );
}

export default App;
