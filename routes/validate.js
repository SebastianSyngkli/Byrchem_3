const express = require("express");
const crypto = require("crypto");
const Customer = require("../models/customer");
require("dotenv").config();

const router = express.Router();

router.post("/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }


  await Customer.findOneAndUpdate(
    { razorpay_order_id: razorpay_order_id },
    {
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    }
  );

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = router;
