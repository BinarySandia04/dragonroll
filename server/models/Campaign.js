const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    name: {type: String, required: true},
    creation_date: { type: Date, default: Date.now},
    last_opened: { type: Date, default: Date.now},
    invite_code: { type: String, unique: true },
    image: { type: String }
});

CampaignSchema.statics.generateInvite = function() {
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTVWXYZ0123456789";
    let cod = '';
  
    for (let i = 0; i < 32; i++) {
      cod += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return cod;
}

module.exports = mongoose.model('Campaign', CampaignSchema);