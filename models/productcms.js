
const mongoose = require('mongoose');
const productcmsSchema = new mongoose.Schema({

    coupon: {
        type: String,
        required: false,
        unique: false,
    },
    banner: {
        type: [String],
        required: false,
        unique: false,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('productCms', productcmsSchema);
