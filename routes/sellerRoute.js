const express = require('express');
const router = express.Router();

const { addSeller, sellerList } = require('../controllers/sellerController');


router.get('/add_seller', addSeller);
router.get('/seller_list', sellerList);




module.exports = router;