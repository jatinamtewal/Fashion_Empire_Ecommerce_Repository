import React, { useEffect, useRef } from "react";
import {
  // PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
// import "./CheckoutForm.css";
import "./payment.css";
// New imports


import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";




export default function CheckoutForm() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  // const stripe = useStripe();
  // const elements = useElements();

  // const [message, setMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("Payment succeeded!");
  //         break;
  //       case "processing":
  //         setMessage("Your payment is processing.");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("Your payment was not successful, please try again.");
  //         break;
  //       default:
  //         setMessage("Something went wrong.");
  //         break;
  //     }
  //   });
  // }, [stripe]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsLoading(true);

  //   const { error,paymentIntent } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       // return_url: `${window.location.origin}/success`,
  //       return_url: `api/v1/success`,
  //     },
  //     redirect:"if_required",
  //   });

  //   // This point will only be reached if there is an immediate error when
  //   // confirming the payment. Otherwise, your customer will be redirected to
  //   // your `return_url`. For some payment methods like iDEAL, your customer will
  //   // be redirected to an intermediate site first to authorize the payment, then
  //   // redirected to the `return_url`.
  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message);
  //   }else if(paymentIntent && paymentIntent.status === "succeeded"){
  //       setMessage("Payment status: " + paymentIntent.status + "🎉" );
  //   } else {
  //     setMessage("An unexpected error occurred.");
  //   }

  //   setIsLoading(false);
  // };



  // New Code

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
        // const submitHandler = () =>{};
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);



  return (
    // <form id="payment-form" onSubmit={handleSubmit}>
    //   <PaymentElement id="payment-element" />
    //   <button disabled={isLoading || !stripe || !elements} id="submit">
    //     <span id="button-text">
    //       {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
    //     </span>
    //   </button>
    //   {/* Show any error or success messages */}
    //   {message && <div id="payment-message">{message}</div>}
    // </form>

    // New Code 
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
  );
}