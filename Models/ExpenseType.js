const mongoose = require('mongoose');

const ExpenseTypes = mongoose.Schema({
    typeID: {
        type: Number,
        required: true,
    },
    typeName: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("ExpenseTypes", ExpenseTypes);