const mongoose = require("mongoose");
var region = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});
// var counter = mongoose.model('counter', CounterSchema);
module.exports = mongoose.model('Region', region)