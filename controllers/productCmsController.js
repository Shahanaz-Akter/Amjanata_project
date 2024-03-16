const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const productcms = require('../models/productcms');

const productCms = async (req, res) => {
    try {
        // console.log('hello');
        res.render('cms/product_cms');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const postProductCms = async (req, res) => {
    try {
        let { title } = req.body;
        console.log(title);
        let coupon = req.files['coupon'] ? req.files['coupon'][0].filename : null;
        let banner = req.files['banner'] ? req.files['banner'] : null;

        console.log(coupon);
        console.log(banner);

        let banner_img_arr = [];
        if (banner != null) {
            banner.forEach(element => {
                banner_img_arr.push('/front_assets/new_images/' + element.filename);
            });
        }
        else {
            console.log('No files uploaded with the name "banner"');
        }


        let data = {
            'title': title,
            'coupon': '/front_assets/new_images/' + coupon,
            'banner': banner_img_arr,

        }

        await productcms.create(data);

        res.render('cms/product_cms.ejs');

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { productCms, postProductCms, }
