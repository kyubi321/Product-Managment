// models/Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
const ProductDetails = mongoose.model('productdetails', ProductSchema);
module.exports = Product;
