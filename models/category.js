const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    parent_category_id: {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    sub_category_id: {
        type: mongoose.Schema.ObjectId,
        required: false
    },

    category: {
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});



module.exports = mongoose.model('Category', categorySchema);
