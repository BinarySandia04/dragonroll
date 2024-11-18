const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    data: { type: Object }, // Data del format dd2vtt
    campaign: {type: mongoose.Types.ObjectId, ref: "Campaign"},
    image: { type: String },
    moduleData: { type: Object }
});

module.exports = mongoose.model('Map', MapSchema);