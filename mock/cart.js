var Mockjs = require('mockjs');
const cartMock = function (app) {
    app.get('/cart/getCartList/qqq', function(req, res) {
        res.json({bbb:"123456" });
    });
    app.get('/cart/getCartList/aaa', function(req, res) {
        res.json({bbb:"123" });
    });
    app.get('/cart/getCartList/www', function(req, res) {
        res.json({bbb:"999" });
    });
  }
  module.exports = cartMock;

  

