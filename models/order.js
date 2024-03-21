// models/User.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    address: {
        type: String,
        required: false,
        unique: false
    },
    delivery: {
        type: Number,
        required: true,
        unique: false
    },
    products: {
        type: [],
        required: true,

    },
    sub_total: {
        type: Number,
        required: false
    },

    total_amount: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
