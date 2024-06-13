const mongoose = require("mongoose");

const feedback = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trips",
    required: true,
  },
});

module.exports = mongoose.model("Feedback", feedback);
