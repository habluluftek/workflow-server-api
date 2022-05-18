const mongoose = require("mongoose");
const jobItemSchema = require("./jobItems");
const userSchema = require("./user");

const paymentSchema = mongoose.Schema({
    value: {
        type: Number,
    },
    mode: {
        type: String,
    },
    transactionRef: {
        type: String,
    },
    transactionDate: {
        type: Number,
    },
    created: {
        type: Date,
    },
    createdby: userSchema.schema
})

module.exports = mongoose.model('Payments', paymentSchema)