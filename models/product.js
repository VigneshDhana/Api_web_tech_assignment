const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true, required: true },
  product_type: { type: String, required: true },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  available_quantity: { type: Number, required: true },
});

const product = mongoose.model("product", productSchema);

module.exports = product;
