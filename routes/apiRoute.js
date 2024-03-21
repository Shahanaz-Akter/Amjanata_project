const express = require('express');
const router = express.Router();

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');
let Product = require('../models/product');
let Customer = require('../models/customer');

const { ObjectId } = require('mongodb');

router.get('/products', async (req, res) => {
    let limit = req.query.limit ? req.query.limit : null;
    let start_index = req.query.skip ? req.query.skip : null;
    if (limit == null && start_index == null) {
        let products = await Product.find({});

        if (products) {

            res.send({
                'success': true,
                'products': products
            });
        }
        else {
            res.send({
                'success': false,
                'products': null
            });
        }

    }
    else {
        let filtered_products = await Product.find({}).skip(start_index).limit(limit);

        if (filtered_products) {
            res.send({
                'success': true,
                'products': filtered_products,

            });
        }
        else {
            res.send({
                'success': false,
                'products': null,

            });
        }


    }


});

router.get('/product/:id', async (req, res) => {
    let product_id = new ObjectId(req.params.id);
    let product = await Product.findOne({ _id: product_id });
    if (product) {
        res.send({
            'success': true,
            'product': product
        });
    }
    else {
        res.send({
            'success': false,
            'product': null
        });
    }

});

// fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
//  .then(res => res.json())
//  .then(console.log);

router.get('/relational_categories', async (req, res) => {

    let all_category = await parentCategory.aggregate([
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

    if (all_category) {
        res.send({
            'success': true,
            'categories': all_category
        });
    }
    else {
        res.send({
            'success': false,
            'categories': null
        });
    }

});

router.get('/parent_category', async (req, res) => {
    let parent_category = await parentCategory.find({});
    if (parent_category) {
        res.send({
            'success': true,
            'parent_category': parent_category
        });
    }
    else {
        res.send({
            'success': false,
            'parent_category': null
        });
    }

});
router.get('/specific_parent_category/:id', async (req, res) => {
    let parent_id = new ObjectId(req.params.id);
    let specific_parent_cate = await parentCategory.findOne({ _id: parent_id });

    if (specific_parent_cate) {
        res.send({
            'success': true,
            'specific_parent_cate': specific_parent_cate
        });
    }
    else {
        res.send({
            'success': false,
            'specific_parent_cate': null
        });
    }

});

router.get('/sub_category', async (req, res) => {
    let sub_category = await subCategory.find({});
    if (sub_category) {
        res.send({
            'success': true,
            'sub_category': sub_category
        });
    }
    else {
        res.send({
            'success': false,
            'sub_category': null
        });
    }

});
router.get('/specific_sub_category/:id', async (req, res) => {
    let sub_id = new ObjectId(req.params.id);
    let specific_sub_cate = await subCategory.findOne({ _id: sub_id });

    if (specific_sub_cate) {
        res.send({
            'success': true,
            'sub_cate': specific_sub_cate
        });
    }
    else {
        res.send({
            'success': false,
            'sub_cate': null
        });
    }

});

router.get('/category', async (req, res) => {
    let category = await Category.find({});
    if (category) {
        res.send({
            'success': true,
            'category': category
        });
    }
    else {
        res.send({
            'success': false,
            'category': null
        });
    }

});
router.get('/specific_category/:id', async (req, res) => {
    let cate_id = new ObjectId(req.params.id);
    let specific_cate = await Category.findOne({ _id: cate_id });

    if (specific_cate) {
        res.send({
            'success': true,
            'specific_cate': specific_cate
        });
    }
    else {
        res.send({
            'success': false,
            'specific_cate': null
        });
    }

});

router.get('/customer', async (req, res) => {
    let customer = await Customer.find({});
    if (customer) {
        res.send({
            'success': true,
            'customer': customer
        });
    }
    else {
        res.send({
            'success': false,
            'customer': null
        });
    }

});

router.get('/customer/:id', async (req, res) => {
    let customer_id = new ObjectId(req.params.id);
    let customer = await Product.findOne({ _id: customer_id });
    if (customer) {
        res.send({
            'success': true,
            'customer': customer
        });
    }
    else {
        res.send({
            'success': false,
            'customer': null
        });
    }

});


module.exports = router;