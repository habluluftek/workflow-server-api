const mongoose = require("mongoose");
const userSchema = require("./user");

const jobItemSchema = mongoose.Schema({
    itemNum: {
        type: Number,
        // required: true
    },
    product: {
        type: String,
        // required: true
    },
    rate: {
        type: Number
    },
    estimatedSellingCost: {
        type: Number
    },
    estimatedProductionCost: {
        type: Number
    },
    actualProductionCost: {
        type: Number
    },
    qty: {
        type: Number
    },
    gstRate: {
        type: Number
    },
    requiredDispatchDate: {
        type: Date
    },
    estimatedDispatchDate: {
        type: Date
    },
    actualDispatchDate: {
        type: Date
    },
    created: {
        type: Date
    },
    createdBy: userSchema.schema,
    updated: {
        type: Date
    },
    updatedBy: userSchema.schema,
    bomcreated: {
        type: Date
    },
    bomcreatedby: userSchema.schema,
    approved: {
        type: Date
    },
    approvedby: userSchema.schema,
    status: {
        type: String
    }
})

module.exports = mongoose.model('Items', jobItemSchema);