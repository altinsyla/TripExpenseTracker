const mongoose = require("mongoose");

const expenses = mongoose.Schema({
    expenseID: {
        type: Number,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users', // foreign key me User.js
        required: true,
    },
    tripID:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Trips', // foreign key me User.js
        required: true, 
    },
    registeredDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseTypes', // foreign key me ExpenseType.js
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
