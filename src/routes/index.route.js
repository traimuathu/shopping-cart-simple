const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

router.get('/', ProductController.IndexPage);

router.get('/:id/product-details', ProductController.ProductDetails);

router.get('/:id/add-to-cart', ProductController.AddtoCart);

router.get('/checkout', ProductController.Checkout);

router.get('/cart', (req, res) => {
  res.render('shop/cart');
})

module.exports = router;