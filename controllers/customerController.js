const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
let Product = require('../models/product');
let Customer = require('../models/customer');
const Order = require('../models/order');

const { ObjectId } = require('mongodb'); // if using MongoDB native driver


const addCustomer = async (req, res) => {

    res.render('customer/add_customer.ejs');
}

const postCustomer = async (req, res) => {
    try {

        let { customer_name, birth, mobile, email, country, address, zip_code, date, password } = req.body;

        let customer = await Customer.create({
            customer_name: customer_name,
            mobile: mobile,
            email: email,
            country: country,
            address: address,
            zip_code: zip_code,
            date: date,
            dob: birth,
            customer_id: Math.floor(Math.random() * 100) + 1,
            otp_num: 1234,
            password: password

        });
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
    res.render('customer/add_customer.ejs');
}

const customerList = async (req, res) => {
    let customers = await Customer.find({});
    // console.log(customers);
    res.render('customer/customer_list.ejs', { customers });
}

const editCustomer = async (req, res) => {
    let id = req.params.id;
    let customers = await Customer.findOne({ _id: id });

    res.render('customer/edit_customer.ejs', { customers });

}
const postEditCustomer = async (req, res) => {
    try {
        let { customer_name, birth, mobile, email, country, address, zip_code, date, otp_num, password } = req.body;
        let id = req.params.id;
        let customers = await Customer.findOne({ _id: id });

        // Update the customer document with provided fields or keep existing values
        customers.customer_name = customer_name || customers.customer_name;
        customers.mobile = mobile || customers.mobile;
        customers.email = email || customers.email;
        customers.country = country || customers.country;
        customers.address = address || customers.address;
        customers.zip_code = zip_code || customers.zip_code;
        customers.date = date || customers.date;
        customers.dob = birth || customers.dob;
        customers.otp_num = otp_num || customers.otp_num;
        customers.otp_num = password || customers.password;

        // Assuming these fields are updated in every edit
        customers.customer_id = customers.customer_id;

        // Save the updated customer
        await customers.save();

        res.redirect('/');

    }
    catch (err) {
        console.log(err);
    }

}

const deleteCustomer = async (req, res) => {
    let id = req.params.id;
    await Customer.deleteOne({ _id: id });
    res.redirect('/customer/customer_list');
}

const userLogin = async (req, res) => {
    let parent = await parentCategory.aggregate([
        {
            $lookup: {
                from: 'subcategories',
                localField: '_id',
                foreignField: 'parent_category_id',
                as: 'subcategories'
            }
        },
        {
            $unwind: "$subcategories" // Unwind the subcategories array
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'subcategories._id',
                foreignField: 'sub_category_id',
                as: 'subcategories.categories'
            }
        },
        {
            $group: {
                _id: '$_id',
                parent_category: { $first: '$parent_category' },
                upc_code: { $first: '$upc_code' },
                category_image: { $first: '$category_image' },
                createdAt: { $first: '$createdAt' },
                __v: { $first: '$__v' },
                subcategories: { $push: '$subcategories' } // Push subcategories into an array
            }
        }
    ]);
    let error = req.query.error ? req.query.error : undefined;
    console.log('error:', error);
    res.render('customer/user_login.ejs', { parent, error });
}

const userRegister = async (req, res) => {
    let parent = await parentCategory.aggregate([
        {
            $lookup: {
                from: 'subcategories',
                localField: '_id',
                foreignField: 'parent_category_id',
                as: 'subcategories'
            }
        },
        {
            $unwind: "$subcategories" // Unwind the subcategories array
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'subcategories._id',
                foreignField: 'sub_category_id',
                as: 'subcategories.categories'
            }
        },
        {
            $group: {
                _id: '$_id',
                parent_category: { $first: '$parent_category' },
                upc_code: { $first: '$upc_code' },
                category_image: { $first: '$category_image' },
                createdAt: { $first: '$createdAt' },
                __v: { $first: '$__v' },
                subcategories: { $push: '$subcategories' } // Push subcategories into an array
            }
        }
    ]);
    res.render('customer/user_register.ejs', { parent });
}
const postRegisterCustomer = async (req, res) => {
    try {
        console.log('post Register Customer');
        let { name, birth, mobile, email, country, address, zip_code, date, password } = req.body;

        let customer = await Customer.create({
            customer_name: name,
            mobile: mobile,
            email: email,
            country: country,
            address: address,
            zip_code: zip_code,
            date: date,
            dob: birth,
            customer_id: Math.floor(Math.random() * 100) + 1,
            otp_num: 1234,
            password: password

        });
        req.session.auth_user = customer;
        res.redirect('/customer/user_login');
    }
    catch (err) {
        console.log(err);
    }
}

const postLoginCustomer = async (req, res) => {
    try {
        let { mobile } = req.body;

        let customer = await Customer.findOne({ mobile: mobile });
        // console.log(customer);

        if (customer) {
            req.session.auth_user = customer;
            // console.log('url: ', req.session.details_route);
            res.redirect(req.session.details_route);
            // Clearing the session route
            // delete req.session.details_route;
        }
        else {
            let referer = req.headers.referer; //previous page
            if (referer && referer.includes('?error=')) {
                // If the referer already contains an error query parameter, redirect without appending another one
                res.redirect(referer);
            } else {
                // Append the error message to the referer URL
                referer = referer ? referer + '?error=Mobile number is not found' : '/';
                res.redirect(referer);
            }

        }


    }
    catch (err) {
        console.log(err);
    }
}

const addCart = async (req, res) => {
    try {
        let error = req.query.error;
        console.log('Add cart method');
        let parent = await parentCategory.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'parent_category_id',
                    as: 'subcategories'
                }
            },
            {
                $unwind: "$subcategories" // Unwind the subcategories array
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'subcategories._id',
                    foreignField: 'sub_category_id',
                    as: 'subcategories.categories'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    parent_category: { $first: '$parent_category' },
                    upc_code: { $first: '$upc_code' },
                    category_image: { $first: '$category_image' },
                    createdAt: { $first: '$createdAt' },
                    __v: { $first: '$__v' },
                    subcategories: { $push: '$subcategories' } // Push subcategories into an array
                }
            }
        ]);

        let product_id = req.params.id;
        let single_product = await Product.findOne({ _id: new ObjectId(product_id) });
        // console.log(single_product);
        let product_arr = req.session.products ? req.session.products : [];

        let product = {
            'id': single_product._id,
            'name': single_product.name,
            'primary_image': single_product.primary_image,
            'selling_price': single_product.selling_price,
            'discount': single_product.discount,
        }

        product_arr.push(product);
        req.session.products = product_arr;

        if (req.session.auth_user) {
            res.redirect('/product/cart');
        }
        else {
            res.redirect('/customer/user_login');
        }

    }
    catch (e) {
        console.log(e.message);
    }
}

const deleteSessionProduct = async (req, res) => {
    let id = req.body.id;
    let sessionProduct = req.session.products;
    req.session.products = sessionProduct.filter(element => element.id !== id); //update session without existing id
    res.send({
        success: true
    })

}
const postOrder = async (req, res) => {
    console.log('post Order');

    let { address, delivery } = req.body;
    console.log('Address: ', address);
    console.log('Delivery: ', delivery);
    let session_products_list = req.session.products;
    console.log(session_products_list);
    try {
        let order = await Order.create({
            address: address,
            delivery: parseInt(delivery),
            products: session_products_list,
            sub_total: null,
            total_amount: null
        });
        if (order) {
            req.session.products = [];
            res.redirect('/');

        }
    }
    catch (e) {
        console.log(e.message);
    }
}


const ses = (req, res) => {
    console.log(req.session.auth_user);
    res.send(req.session.products);

}
const addOrder = async (req, res) => {

    res.render('order/add_order.ejs');
}
const orderList = async (req, res) => {

    let orders = await Order.find({});
    res.render('order/order_list.ejs', { orders });
}
module.exports = { addOrder, orderList, ses, deleteSessionProduct, postOrder, addCustomer, postCustomer, postEditCustomer, customerList, editCustomer, deleteCustomer, userLogin, userRegister, addCart, postRegisterCustomer, postLoginCustomer }


