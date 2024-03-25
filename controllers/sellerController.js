const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
const Product = require('../models/product');
const Seller = require('../models/seller');
var requests = require('request');


const addSeller = async (req, res) => {
    res.render('seller/admin_seller/add_seller.ejs');
}

const sellerList = async (req, res) => {
    res.render('seller/admin_seller/seller_list.ejs');
}

const addSellerProduct = async (req, res) => {
    res.render('seller/admin_seller/add_product_seller.ejs');

}

const sellerProductList = async (req, res) => {

    let products = await sellerProduct.find({});
    res.render('seller/admin_seller/seller_product_list.ejs');

}


// Single Seller 
const sellerRegister = async (req, res) => {
    res.render('seller/seller_register.ejs');
}

const numberVerification = async (req, res) => {
    res.render('seller/number_verification.ejs');




}
const postNumberVerification = async (req, res) => {
    let { phone } = req.body;
    // Generate OTP start

    const newOtp = Math.floor(Math.random() * (9999 - 1234 + 1) + 1234);

    // Access environment variables
    const smsApiUrl = 'https://api.sms.net.bd/sendsms';
    const smsApiKey = '0k4pEM8Atavv3W1c5af3vEYUB99j9kCZ5rYb84ZE';

    // Send OTP via SMS
    // Need to use this 3 line code for sending otp to the requested number
    var options = {
        'method': 'POST',
        'url': smsApiUrl,
        formData: {
            'api_key': smsApiKey,
            msg: `Your Ztrios OTP Number: ${newOtp}`,
            to: phone,
        }
    };

    requests(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

    console.log('SMS API Response:', options.data);

    // Generate OTP end

    let seller = await Seller.create({
        'id': '',
        'phone': phone,
        'store_name': '',
        'seller_user_name': '',
        'business_type': '',
        'seller_image': '',
        'address': '',
        'otp_num': newOtp,
    });
    let seller_id = seller.id;
    res.render('seller/verification_code', { seller_id });
}

const sellerInformation = async (req, res) => {

    res.render('seller/information.ejs');

}
const postSellerInformation = async (req, res) => {
    console.log('Hello');
}
const sellerAddProduct = async (req, res) => {

    res.render('seller/seller_register.ejs');

}
const postSellerAddProduct = async (req, res) => {
    console.log('Hello');
}

const appHome = async (req, res) => {
    res.render('seller/app_home.ejs');
}
const sellerPayment = async (req, res) => {
    res.render('seller/seller_payment.ejs');
}
const orderList = async (req, res) => {
    res.render('seller/order_list.ejs');
}




// sellerRegister, numberVerification, verificationCode, sellerInformation, sellerAddProduct, sellerPayment,orderList
module.exports = {
    addSeller, sellerList, addSellerProduct, sellerProductList, sellerRegister, numberVerification, sellerInformation, sellerAddProduct, sellerPayment, orderList, postNumberVerification, postSellerInformation, postSellerAddProduct, appHome
}