const mongoose = require("mongoose");
const jobItemSchema = require("./jobItems");
const userSchema = require("./user");

const dispatchSchema = mongoose.Schema({
    items: [jobItemSchema.schema],
    requestedDispatchDate:{
        type: Date,
    },
    actualDispatchDate:{
        type: Date,
    },
    approved: {
        type: Date,
    },
    approvedby: userSchema.schema,
    created: {
            type: Date,
        },
    createdby: userSchema.schema
})

module.exports = mongoose.model('Dispatches', dispatchSchema)