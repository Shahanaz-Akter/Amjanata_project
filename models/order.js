// models/User.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    delivery_charge: {
        type: Integer,
        required: true,
        unique: false
    },
    products: {
        type: [String],
        required: true,

    },
    sub_total: {
        type: Number,
        required: false
    },
    total: {
        type: Number,
        required: false
    },
    discount: {
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
