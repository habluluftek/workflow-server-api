const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./user");
const customerSchema = require("./customer");
const status = require("./status");
var autoIncrement = require('mongoose-sequence')(mongoose);
// autoIncrement.initialize(mongoose.connection);

const enquirySchema = mongoose.Schema({
    jobRef: {
        type: Number,
        // required: true
    },
    customer: customerSchema.schema,
    projectName: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    quoteDate: {
        type: Date,
        // required: true
    },
    productDesc: {
        type: String,
        // required: true
    },
    qty: {
        type: Number,
        // required: true
    },
    value: {
        type: Number,
        // required: true
    },
    salesEr: userSchema.schema,
    appEr: userSchema.schema,
    createdby: userSchema.schema,
    created: {
        type: Date,
        // required: true
    },
    updatedby: userSchema.schema,
    updated: {
        type: Date,
        // required: true
    },
    status: status.schema,
    coilCositing: [],   

});
// Job.plugin(autoIncrement.plugin, 'Jobs');
module.exports = mongoose.model('Enquiries', enquirySchema);