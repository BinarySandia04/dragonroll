const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntitySchema = new Schema({
    name: {type: String, required: true},
    data: { type: Object },
    campaign: {type: mongoose.Types.ObjectId, ref: "Campaign"},
    token_image: { type: String },
});

module.exports = mongoose.model('Entity', EntitySchema);