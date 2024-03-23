const express = require('express');
const router = express.Router();

const { addSeller, sellerList,addSellerProduct,sellerProductList } = require('../controllers/sellerController');


router.get('/add_seller', addSeller);
router.get('/seller_list', sellerList);
router.get('/add_seller_product', addSellerProduct);
router.get('/seller_product_list', sellerProductList);


module.exports = router;