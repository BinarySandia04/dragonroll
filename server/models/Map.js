const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: {type: String, required: true},
    data: { type: Object }, // Data del format dd2vtt
    campaign: {type: mongoose.Types.ObjectId, ref: "Campaign"},
    image: { type: String },
    entities: { type: Object }
});

module.exports = mongoose.model('Entity', EntitySchema);