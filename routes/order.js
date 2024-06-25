const express = require("express");
const Razorpay = require("razorpay");
const Customer = require("../models/customer");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, contact, amount, currency, receipt } = req.body;
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    const newCustomer = new Customer({
      name,
      email,
      contact,
      razorpay_order_id: order.id,
      razorpay_payment_id: "",
      razorpay_signature: "",
    });

    await newCustomer.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

module.exports = router;

