const mongoose = require("mongoose");

const expenses = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  tripID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trips",
    required: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseType",
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
});

module.exports = mongoose.model("Expenses", expenses);
