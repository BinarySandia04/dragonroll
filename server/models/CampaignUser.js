const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CampaignUserSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: "User"},
    campaign: {type: mongoose.Types.ObjectId, ref: "Campaign"},
    is_dm: {type: Boolean, default: false}
});

module.exports = mongoose.model('CampaignUser', CampaignUserSchema);