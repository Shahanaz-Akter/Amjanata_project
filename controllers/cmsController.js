const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const landingcms = require('../models/landingcms');

const pageCms = async (req, res) => {
    try {
        // console.log('hello');
        res.render('cms/page_cms');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const postCms = async (req, res) => {
    try {
        // discount_image upper_banner logo_image feature_brands coupon_image deals_image crazy_deals

        let { title } = req.body;
        let discount_image = req.files['discount_image'] ? req.files['discount_image'][0].filename : null;
        let logo_image = req.files['logo_image'] ? req.files['logo_image'][0].filename : null;
        let feature_brands = req.files['feature_brands'] ? req.files['feature_brands'][0].filename : null;
        let deals_image = req.files['deals_image'] ? req.files['deals_image'][0].filename : null;
        let coupon_image = req.files['coupon_image'] ? req.files['coupon_image'][0].filename : null;
        let crazy_deals = req.files['crazy_deals'] ? req.files['crazy_deals'][0].filename : null;
        let upper_banner = req.files['upper_banner'] ? req.files['upper_banner'] : null;

        let upper_img_arr = [];
        if (upper_banner != null) {
            upper_banner.forEach(element => {
                upper_img_arr.push('/front_assets/new_images/' + element.filename);
            });
        }
        else {
            console.log('No files uploaded with the name "upper_banner"');
        }


        let data = {
            'title': title,
            'discount_image': '/front_assets/new_images/' + discount_image,
            'upper_banner': upper_img_arr,
            'logo_image': '/front_assets/new_images/' + discount_image,
            'feature_brands': '/front_assets/new_images/' + discount_image,
            'deals_image': '/front_assets/new_images/' + discount_image,
            'coupon_image': '/front_assets/new_images/' + discount_image,
            'crazy_deals': '/front_assets/new_images/' + discount_image
        }

        await landingcms.create(data);

        res.render('cms/landing_page_cms');

        // landingcms.create();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const productCms = async (req, res) => {
    try {
        // console.log('hello');
        res.render('cms/product_cms');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const socialCms = async (req, res) => {
    try {
        // console.log('hello');
        res.render('cms/social_cms');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const cartCms = async (req, res) => {
    try {
        // console.log('hello');
        res.render('cms/cart_cms');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { pageCms, postCms, productCms, socialCms, cartCms }
