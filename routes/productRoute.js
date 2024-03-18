const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { productList, category, postAddProduct, addProduct, manualAddProduct, postCategory, getCategory, allProduct, all_Produc, ProductDetails, cart, social, hotTrends, checkout, portFolio,
} = require('../controllers/productController');

const upload = require('../multer');

router.get('/product_list', productList);
router.get('/category', category);
router.post('/post_category', upload.fields([{ name: 'category_image', maxCount: 1 },]), postCategory);

router.get('/add_product/:id', addProduct);
router.get('/manual_add_product', manualAddProduct);

router.post('/post_add_product', upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'category_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: Infinity }
]), postAddProduct);

router.post('/get_category', getCategory);
router.get('/all_Product/:id/:cate_name', allProduct);
router.get('/all_Product', all_Produc);

router.get('/product_details/:id', ProductDetails);
router.get('/cart/:id', cart);

router.get('/social', social);
router.get('/hot_trends', hotTrends);
router.get('/checkout', checkout);
router.get('/portfolio', portFolio);



module.exports = router;