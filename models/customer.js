const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: { type: String, unique: true, required: true },
  customer_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  balance: { type: Number, required: true },
});

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;
