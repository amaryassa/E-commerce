const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'product detail',
      path: '/product-detail'
    });
  });

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your cart',
    path: '/cart'
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product)=> {
    Cart.addProduct(prodId,product.price);
  });
  res.redirect('/cart');

  // res.render('shop/cart', {
  //   pageTitle: 'Your cart',
  //   path: '/cart'
  // });
};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your orders',
    path: '/orders'
  });
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Your cart',
    path: '/checkout'
  });
};
