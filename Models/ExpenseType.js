const mongoose = require("mongoose");

const ExpenseTypes = mongoose.Schema({
  typeName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ExpenseTypes", ExpenseTypes);
