const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {type: String, trim: true, default: ''},
  image: {type: String, trim: true},
  categoryId: {type: Number},
  price: {type: Number},
  status: {type: Number, default: 1}
});

module.exports = mongoose.model('products', ProductSchema, 'products');