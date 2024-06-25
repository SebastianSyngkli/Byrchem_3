const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  amount: Number,
  currency: String,
  receipt: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  // paid: { type: Boolean, default: false }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
