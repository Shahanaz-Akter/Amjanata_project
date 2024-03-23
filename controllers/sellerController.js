const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
const Product = require('../models/product');
const sellerProduct = require('../models/seller_product');


const addSeller = async (req, res) => {
    res.render('seller/add_seller.ejs');
}

const sellerList = async (req, res) => {
    res.render('seller/seller_list.ejs');
}

const addSellerProduct = async (req, res) => {
    res.render('seller/add_product_seller.ejs');

}

const sellerProductList = async (req, res) => {

    let products = await sellerProduct.find({});
    res.render('seller/seller_product_list.ejs');

}

module.exports = { addSeller, sellerList, addSellerProduct, sellerProductList }