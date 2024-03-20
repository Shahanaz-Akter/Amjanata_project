const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { ses, userLogin, userRegister, addCart, addCustomer, postCustomer, customerList, editCustomer, postEditCustomer, deleteCustomer, postRegisterCustomer, postLoginCustomer } = require('../controllers/customerController');

router.get('/ses', ses);

router.get('/user_login', userLogin);
router.get('/user_register', userRegister);

router.get('/add_cart/:id', addCart);

router.get('/add_customer', addCustomer);
router.get('/customer_list', customerList);

router.post('/post_customer', postCustomer);
router.get('/edit_customer/:id', editCustomer);
router.post('/post_edit_customer/:id', postEditCustomer);

router.get('/delete_customer/:id', deleteCustomer);

router.post('/post_register_customer', postRegisterCustomer);
router.post('/post_login_customer', postLoginCustomer);

module.exports = router;