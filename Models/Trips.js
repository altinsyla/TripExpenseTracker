const mongoose = require("mongoose");

const Trips = mongoose.Schema({
    tripID: {
        type: Number,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }],
    transportTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transport", required: true }],
    startDate : {
        type: Date,
        required: true,
    },
    endDate : {
        type: Date,
        required: true,
    },
    location : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // munet me kan NULL
    },
})

module.exports = mongoose.model("Trips", Trips);
