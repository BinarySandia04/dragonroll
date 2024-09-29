const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");

const CampaignSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    system: {type: String, required: true},
    creation_date: { type: Date, default: Date.now},
    last_opened: { type: Date, default: Date.now},
    invite_code: { type: String, unique: true },
    image: { type: String }
});

CampaignSchema.statics.generateInvite = function() {
    return crypto.randomBytes(8).toString('base64url');
}

module.exports = mongoose.model('Campaign', CampaignSchema);