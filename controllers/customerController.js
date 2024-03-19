const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
let Product = require('../models/product');
let Customer = require('../models/customer');


const addCustomer = async (req, res) => {

    res.render('customer/add_customer.ejs');
}


const postCustomer = async (req, res) => {
    try {

        let { customer_name, birth, mobile, email, country, address, zip_code, date } = req.body;

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

        });
        res.redirect('/customer/customer_list');
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
        let { customer_name, birth, mobile, email, country, address, zip_code, date, otp_num } = req.body;
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

        // Assuming these fields are updated in every edit
        customers.customer_id = customers.customer_id;

        // Save the updated customer
        await customers.save();

        res.redirect('/customer/customer_list');

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
    res.render('customer/user_login.ejs', { parent });

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
module.exports = { addCustomer, postCustomer, postEditCustomer, customerList, editCustomer, deleteCustomer, userLogin, userRegister }


