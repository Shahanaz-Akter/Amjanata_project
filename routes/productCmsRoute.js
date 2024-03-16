const express = require('express');
const router = express.Router();

const { productCms, postProductCms } = require('../controllers/productCmsController');
const upload = require('../multer');


router.get('/product_cms', productCms);
// discount_image upper_banner logo_image feature_brands coupon_image deals_image crazy_deals

router.post('/post_product_cms', upload.fields(
    [{ name: 'coupon', maxCount: 1 },
    { name: 'banner', maxCount: Infinity },
    ]
), postProductCms);

module.exports = router;