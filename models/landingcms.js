const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema({

    discount_image: {
        type: String,
        required: false,
        unique: false,
    },
    upper_banner: {
        type: [String],
        required: false,
        unique: false,
    },

    logo_image: {
        type: String,
        required: false,
        unique: false,

    },
    coupon_image: {
        type: String,
        required: false,
        unique: false,
    },
    deals_image: {
        type: String,
        required: false,
        unique: false,
    },
    feature_brands: {
        type: String,
        required: false,
        unique: false,
    },
    crazy_deals: {
        type: String,
        required: false,
        unique: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('landingCms', landingSchema);
