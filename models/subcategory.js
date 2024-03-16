const mongoose = require('mongoose');

const category1Schema = new mongoose.Schema({

    parent_category_id: {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    sub_category: {
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('subCategory', category1Schema);
