const mongoose = require("mongoose");
const user = require("./user");
const repSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    phone: [{type: Number}],
    designation: {type: String}
})
module.exports = mongoose.model('CustomerRep', repSchema);