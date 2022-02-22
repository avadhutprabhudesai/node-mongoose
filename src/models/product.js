const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  tags: Array,
  info: Object,
  authors: Array,
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
