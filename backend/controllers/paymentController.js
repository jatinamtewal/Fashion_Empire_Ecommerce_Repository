const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")('sk_test_51LzNXdSFKCPcpIzxhzlnDuoVJzRfqj0R4Vs0nHyuc4JS53oWEYEYXIx88t8yNa8Ah5Tu96XAVH5lhNRpuixKvGD400Ow2rmJ21');


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Fashion Empire",
      },
    });
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  });


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});