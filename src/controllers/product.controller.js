const ProductSchema = require('../models/product.model');
const Cart = require('../utils/cart');

const ProductController = {}

ProductController.IndexPage = (req, res) => {
  ProductSchema.find((err, data) => {
    if(err) {
      throw err;
    }

    if(data) {
      if(req.session.user) {
        res.render('shop/index', {user: req.session.user, products: data});
      } else {
        res.render('shop/index', {products: data});
      }
    }
  });
}

ProductController.ProductDetails = (req, res) => {
  const id = req.params.id;
  ProductSchema.findById({_id: id}, (err, data) => {
    if(err) {
      throw err;
    }

    if(data) {
      res.render('shop/product-details', {item: data});
    }
  });
}

ProductController.AddtoCart = (req, res) => {
  const productId = req.params.id;

  const cart = new Cart(req.session.cart ? req.session.cart : {});

  ProductSchema.findById({_id:productId}, (err, data) => {
    if(err) {
      return res.redirect('/');
    }

    cart.add(data, productId);
    req.session.cart = cart;
    console.log('Cart session: ', req.session.cart);
    res.redirect('/');
  });
}

ProductController.Checkout = (req, res) => {
  if (!req.session.cart) {
    res.render('shop/checkout', {item: null});
  }

  var cart = new Cart(req.session.cart);
  console.log('Cart: ', req.session.cart);
  res.render('shop/checkout', {product: cart.generateArr(), totalPrice: cart.totalPrice});

}

module.exports = ProductController;