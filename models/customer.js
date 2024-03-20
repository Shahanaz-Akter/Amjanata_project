
const mongoose = require('mongoose')

const Customerschema = new mongoose.Schema({

    customer_name: {
        type: String,
        required: false,
        unique: false
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: false,
        unique: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    country: {
        type: String,
        required: false,
        unique: false
    },

    address: {
        type: String,
        required: false,
        unique: false
    },
    zip_code: {
        type: String,
        required: false,
        unique: false
    },
    customer_id: {
        type: Number,
        required: false,
        unique: false
    },
    date: {
        type: String,
        required: false,
        unique: false
    },
    otp_num: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

let Customer = mongoose.model('Customer', Customerschema);

module.exports = Customer;