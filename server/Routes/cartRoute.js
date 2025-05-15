const router = require('express').Router();
const {addToCart, getCartItems, updateItems} = require('../Controllers/cartController')

 router.post("/addToCart", addToCart);
 router.post("/getItems", getCartItems);
 router.post("/updateItems", updateItems);

module.exports = router;