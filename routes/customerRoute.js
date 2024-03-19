const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { addCustomer, postCustomer, customerList, editCustomer, postEditCustomer, deleteCustomer } = require('../controllers/customerController');

router.get('/add_customer', addCustomer);
router.get('/customer_list', customerList);

router.post('/post_customer', postCustomer);
router.get('/edit_customer/:id', editCustomer);
router.post('/post_edit_customer/:id', postEditCustomer);

router.get('/delete_customer/:id', deleteCustomer);

module.exports = router;