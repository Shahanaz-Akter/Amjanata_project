const express = require('express');
const router = express.Router();

const { addSeller, sellerList, addSellerProduct, sellerProductList, sellerRegister, numberVerification, sellerInformation, sellerAddProduct, sellerPayment, orderList, postNumberVerification, postSellerInformation, postSellerAddProduct, appHome

} = require('../controllers/sellerController');

// admin seller management 
router.get('/add_seller', addSeller);
router.get('/seller_list', sellerList);
router.get('/add_seller_product', addSellerProduct);
router.get('/seller_product_list', sellerProductList);

//Specific seller management 
router.get('/seller_register', sellerRegister);

router.get('/number_verification', numberVerification);
router.post('/post_number_verification', postNumberVerification);

router.get('/seller_information', sellerInformation);
router.post('/post_seller_information', postSellerInformation);

router.get('/seller_add_product', sellerAddProduct);
router.post('/post_seller_add_product', postSellerAddProduct);

router.get('/app_home', appHome);


// router.get('/seller_product_list', sellerProductList); //same as admin view
router.get('/seller_payment', sellerPayment);
router.get('/order_list', orderList);


module.exports = router;