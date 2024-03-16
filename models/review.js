
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    thumb: {
        type: String,
        required: false,
        unique: false
    },
    like: {
        type: String,
        required: false,
        unique: false
    },
    comments: {
        type: String,
        required: false
    },
    star: {
        type: String,
        required: false,
        unique: false
    },
    date: {
        type: String,
        required: false,
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
