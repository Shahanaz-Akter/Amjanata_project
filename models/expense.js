const mongoose = require('mongoose');
let expenseSchema = new mongoose.Schema({

    date: {
        type: String,
        required: false,
        unique: false,
    },
    expense_type: {
        type: String,
        required: false,
        unique: false
    },
    expense_category: {
        type: String,
        required: false,
        unique: false,
    },
    voucher_no: {
        type: Number,
        required: false,
        unique: false,
    },
    amount: {
        type: Number,
        required: false,
        unique: false,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },


});

let Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;