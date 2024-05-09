const mongoose = require('mongoose');
// const User = require('./User');

const expenses = mongoose.Schema({
    expenseID: {
        type: Number,
        required: true,
    },
    userID: {
        type: Number, // gjaje qysh me ba foreign key
        required: true,
    },

    registeredDate: {
        type: Date,
        default: new Date(),
        required: true,
    },
    type: {
        type: Number, // foreign key me ExpenseType.js
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number, // gjaje data type per money
        required: true,
    },
})

module.exports = mongoose.model("Expenses", expenses);