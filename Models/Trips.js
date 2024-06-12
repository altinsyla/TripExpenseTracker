const mongoose = require("mongoose");

const Trips = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  budget: {
    type: Number,
    required: true,
  },
  transportType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transport",
    required: true,
  },
});

module.exports = mongoose.model("Trips", Trips);
