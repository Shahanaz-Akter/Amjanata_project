const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');


const addSeller = async (req, res) => {

    res.render('seller/add_seller.ejs');
}

const sellerList = async (req, res) => {
    res.render('seller/seller_list.ejs');

}

module.exports = { addSeller, sellerList }