const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    passport: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    education: {
        type: String,
        default: ""
    },

    course: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        default: ""
    },

    dateOfBirth: {
        type: String,
        default: ""
    },

    workHours: {
        type: Number,
        default: 0
    },

    cv: {
        type: String,
        default: ""
    },

    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
    },

    applicationStatus: {
        type: String,
        default: "Not Applied"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);