const mongoose = require("mongoose");
const user = require("./user");
const region = require("./region");

const addressSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    region: region.schema,
    salesEr: user.schema,
    country:{
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    address: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    gstin: {
        type: String,
    },
    created: {
        type: Date,
    },
    createdBy: user.schema,
    updated: {
        type: Date,
    },
    updatedBy: user.schema,


})
module.exports = mongoose.model('CustomerAddress', addressSchema);