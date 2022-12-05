import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
// import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

import axios from "axios";
// import "./payment.css";

// import "./CheckoutForm.css";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import EventIcon from "@material-ui/icons/Event";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import { useNavigate } from "react-router-dom";
// import { createOrder, clearErrors } from "../../actions/orderAction";
// import { sendStripeApiKey } from "../../../../backend/controllers/paymentController";


// const publishableKeys = `${process.env.STRIPE_API_KEY}`;
// console.log(publishableKeys);
// const stripeApiKey =loadStripe(publishableKeys);
// console.log(stripeApiKey);



const Payment = () => {
  // const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  // new thing open

  const [stripePromise, setStripePromise] = useState(null);
  // const [clientSecret,setClientSecret] = useState("");
  // useEffect(()=>{
  //   fetch("/config").then(async (r) =>{
  //     const {publishableKey} =await r.json();
  //     console.log(publishableKey);

  //     setStripePromise(loadStripe(publishableKey));

  //   });
  // },[]);
  
  // useEffect(()=>{
  //   fetch("/create-payment-intent",{
  //     method:"POST",
  //     body:JSON.stringify({}),
  //   }).then(async (r) =>{
  //     const {clientSecret} =await r.json();
  //     console.log(clientSecret);

  //     setClientSecret(clientSecret);

  //   });
  // },[]);

  // new thing close

  // brand new thing open  ---Working Fine


    // async function getStripeApiKey() {
    //   const { data } = await axios.get("/api/v1/stripeapikey");

    //   setStripeApiKey(data.stripeApiKey);
    //   console.log(stripeApiKey);
    // }
    // getStripeApiKey();
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapikey");

      setStripePromise(loadStripe(data.stripeApiKey));
      console.log(stripePromise);
    }
    useEffect(()=>{
      getStripeApiKey();
    },[]);
    // getStripeApiKey();

    // brand new thing close
  return (
    <Fragment>
      <MetaData title="Payment - FASHION EMPIRE" />
      <CheckoutSteps activeStep={2} />
      
      {/* React Stripe  */}
      {/* {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm/>
        </Elements>
      )} */}
      {stripePromise &&  (
        <Elements stripe={stripePromise} >
        <CheckoutForm/>
        </Elements>
      )}
      
      {/* {stripePromise && (<Elements stripe={stripePromise} options={{clientSecret}}>
      <div className="paymentContainer">
       
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
      
      </Elements>)} ; */}
      
    </Fragment>
  );
};

export default Payment;
