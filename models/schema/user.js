const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        // autoIncrement: true,
        // primaryKey: true,
        // required: true
    },
    username: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    firstname: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
        // required: true
    },
    department: {
        type: Number,
        // required: true
    },
    designation: {
        type: Number,
        // required: true
    },
    accessrole: {
        type: Number,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    photourl: {
        type: String,
        // required: true
    },
    region: {
        type: String,
        // required: true
    },
    created: {
        type: Date,
        // required: true
    },
    updated: {
        type: Date,
        // required: true
    },
    phoneNum: {
        type: Number,
        // required: true
    },
})

module.exports = mongoose.model('Users', userSchema)