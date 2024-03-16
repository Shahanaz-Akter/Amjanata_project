const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

let parentCategory = require('../models/parentcategory');
let subCategory = require('../models/subcategory');
let Category = require('../models/category');

const userView = async (req, res) => {

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


    res.render('user/index.ejs', { parent });
}
const category = async (req, res) => {

    res.render('user/grocery.ejs');
}

const master = async (req, res) => {
    res.render('layouts/master.ejs');

}

module.exports = { userView, master, category }