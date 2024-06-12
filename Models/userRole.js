const mongoose = require("mongoose");

const userRole = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userRole", userRole);
