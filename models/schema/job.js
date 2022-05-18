const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = require("./user");
const customerSchema = require("./customer");
const jobItemSchema = require("./jobItems");
const dispatch = require("./dispatch");
const payment = require("./payment");
var autoIncrement = require('mongoose-sequence')(mongoose);
// autoIncrement.initialize(mongoose.connection);

const jobSchema = mongoose.Schema({
    soNum: {
        type: Number,
        ref: 'soNum',
        // required: true,
        unique: true,
        autoIncrement: true
    },
    jobRef: {
        type: Number,
        // required: true
    },
    poNum: {
        type: String,
        // required: true
    },
    poDate: {
        type: Date,
        // required: true
    },
    customer: customerSchema.schema,
    projectName: {
        type: String,
        // required: true
    },
    currency: {
        type: String,
        // required: true
    },
    frieghtScope: {
        type: String,
        // required: true
    },
    frieghtCharge: {
        type: Number,
        // required: true
    },
    paymentTerms: {
        type: String,
        // required: true
    },
    salesEr: userSchema.schema,
    createdBy: userSchema.schema,
    created: {
        type: Date,
        // required: true
    },
    updatedBy: userSchema.schema,
    updated: {
        type: Date,
        // required: true
    },
    status: {
       type: String,
    },
    items: [jobItemSchema.schema],
    dispatches: [dispatch.schema],
    payments:[payment.schema]

});
jobSchema.plugin(autoIncrement, {id:'job_count',inc_field: 'soNum'});
// Job.plugin(autoIncrement.plugin, 'Jobs');
module.exports = mongoose.model('Jobs', jobSchema);