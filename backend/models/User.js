const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now},
    admin: {type: Boolean, default: false},
    image: { type: String },
    setupCode: { type: String },
    settings: { type: Object }
});

module.exports = mongoose.model('User', UserSchema);