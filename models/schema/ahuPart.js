const mongoose = require("mongoose");
var ahuPart = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});
// var counter = mongoose.model('counter', CounterSchema);
module.exports = mongoose.model('AhuPart', ahuPart)