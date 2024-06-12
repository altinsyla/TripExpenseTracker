const mongoose = require("mongoose");

const budget = mongoose.Schema({
  tripID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trips",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Budget", budget);
