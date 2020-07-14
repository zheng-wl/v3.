const cartMock = require('./cart');
// import cartMock  from './cart'
function Mock(app) {
    // app.get('/cart/getCartList', function(req, res) {
    //   res.json({ aaa: '111' ,adf : cartMock});
    //   console.log(cartMock)
    // });
    cartMock(app)
  }
  
  module.exports = Mock;