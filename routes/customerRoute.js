const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { userLogin, userRegister, addCustomer, postCustomer, customerList, editCustomer, postEditCustomer, deleteCustomer } = require('../controllers/customerController');

router.get('/user_login', userLogin);
router.get('/user_register', userRegister);


router.get('/add_customer', addCustomer);
router.get('/customer_list', customerList);

router.post('/post_customer', postCustomer);
router.get('/edit_customer/:id', editCustomer);
router.post('/post_edit_customer/:id', postEditCustomer);

router.get('/delete_customer/:id', deleteCustomer);

module.exports = router;