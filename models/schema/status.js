const mongoose = require("mongoose");
var status = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});
// var counter = mongoose.model('counter', CounterSchema);
module.exports = mongoose.model('Status', status)