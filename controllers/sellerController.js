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
    // const newOtp = Math.floor(Math.random() * (9999 - 1234 + 1) + 1234);
    const newOtp = 1234;
    // Access environment variables
    const smsApiUrl = 'https://api.sms.net.bd/sendsms';
    const smsApiKey = '0k4pEM8Atavv3W1c5af3vEYUB99j9kCZ5rYb84ZE';

    // Send OTP via SMS
    // Need to use this 3 line code for sending otp to the requested number
    // var options = {
    //     'method': 'POST',
    //     'url': smsApiUrl,
    //     formData: {
    //         'api_key': smsApiKey,
    //         msg: `Your Ztrios OTP Number: ${newOtp}`,
    //         to: phone,
    //     }
    // };

    // requests(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);
    // });

    // console.log('SMS API Response:', options.data);

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

    let seller_id = seller._id;
    let phn = phone.slice(0, 3);
    res.render('seller/verification_code.ejs', { seller_id, phn });
}

const postVerificationCode = async (req, res) => {
    // console.log('hhhhhhh');
    let { num1, num2, num3, num4 } = req.body;
    let num = num1 + num2 + num3 + num4;
    // console.log(num);
    let param_id = req.params.id;
    console.log('param_id: ', param_id);

    let record = await Seller.findById(param_id);
    // console.log('record: ', record);

    if (record && record.otp_num == num) {

        res.render('seller/information.ejs', { param_id });
    }
    else {
        previousUrl = req.get('referer');
        res.redirect(previousUrl);
    }

}

const postInformation = async (req, res) => {
    try {
        let { store_name, seller_user_name, business_type, address } = req.body;
        // console.log(store_name, seller_user_name, business_type, address);
        let id = req.params.id;

        let update = await Seller.updateOne(
            { _id: id }, // Filter based on the _id field
            {
                $set: {
                    store_name: store_name,
                    seller_user_name: seller_user_name,
                    business_type: business_type,
                    seller_image: req.files['seller_picture'] ? '/front_assets/new_images/' + req.files['seller_picture'][0].filename : null,
                    address: address
                }
            }
        );

        console.log('update seller: ', update);

        if (update) {
            req.session.sellerId = id;
            res.render('seller/app_home.ejs');
        }

    } catch (error) {
        // Handle any errors that might occur during update
        console.error("Error updating record:", error);
        res.status(500).send("Error updating record");
    }
}

const productUpload = async (req, res) => {
    res.render('seller/product_upload.ejs');
}

const postProductUpload = async (req, res) => {
    let { product_name, selling_price, discount, category, stock, description } = req.body;
    let images = req.files['product_img'];
    // console.log(images);
    let sec_img = [];
    images.forEach(img => {
        sec_img.push('/front_assets/new_images/' + img.filename);
    });

    console.log('sec_img :', sec_img);

    //latest parent categories uopc code
    const latestCategory = await parentCategory.findOne({}).sort({ createdAt: -1 });
    let latest_upc_code = parseInt(latestCategory.upc_code);
    // latest_upc_code = isNaN(latest_upc_code) ? 0 : latest_upc_code;
    latest_upc_code++;
    // Ensure the UPC code is formatted as a 4-digit string with leading zeros
    let upc_code = latest_upc_code.toString().padStart(4, '0');

    let timestamp = Date.now().toString(); // Get the current timestamp as a string
    let sku_code = upc_code + timestamp;

    let p = {
        'sku_code': sku_code ? sku_code : null,
        'upc_code': upc_code ? upc_code : null,
        'name': product_name ? product_name : null,
        'brand': null,
        'color': null,
        'parent_category': null,
        'sub_category': null,
        'category': category ? category : null,
        'product_type': null,
        'buying_price': null,
        'selling_price': selling_price ? selling_price : null,
        'discount': discount ? discount : null,
        'date': null,
        'total_qty': null,
        'price': null,
        'category_image': null,
        'old_price': null,
        'primary_image': sec_img ? sec_img[0] : null,
        'secondary_image': sec_img ? sec_img : null,
        'description': description ? description : null,
        'colorVariants': null,
        'sizeVariants': null,
        'product_code': Math.floor(Math.random() * 1000) + 1,
        'seller_id': req.session.sellerId
    }

    let record = await Product.create(p);

    if (record) {
        let product_list = await Product.find({ seller_id: req.session.sellerId });
        console.log('product_list: ', product_list);
        res.render('seller/product_list', { product_list });
    }
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
    addSeller, sellerList, addSellerProduct, sellerProductList, sellerRegister, numberVerification, postVerificationCode, sellerAddProduct, productUpload, postProductUpload, sellerPayment, orderList, postNumberVerification, postInformation, postSellerAddProduct, appHome
}