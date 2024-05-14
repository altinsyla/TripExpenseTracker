const mongoose = require('mongoose');

const transport = mongoose.Schema({
    transportID : {
        type: Number,
        required: true
    },
    tripID: {
        type: mongoose.Schema.Types.ObjectID, ref: 'Trips',
        required: 'true'
    },
    transportType: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Transport", transport);