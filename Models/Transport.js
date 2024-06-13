const mongoose = require("mongoose");

const transport = mongoose.Schema({
  transportType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transport", transport);
