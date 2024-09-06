const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: {type: String, required: true},
    data: { type: Object },
    campaign_user: {type: mongoose.Types.ObjectId, ref: "CampaignUser"},
    splash_image: { type: String },
});

module.exports = mongoose.model('Character', CharacterSchema);