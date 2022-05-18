const mongoose = require("mongoose");
const customerAddress = require("./customerAddress");
const customerReps = require("./customerRep");

const customerSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    createdDate: {
        type: Date,
    },
    updatedDate: {type: Date,},
    address: [customerAddress?.schema],
    reps: [customerReps?.schema]

})

module.exports = mongoose.model('Customers', customerSchema);