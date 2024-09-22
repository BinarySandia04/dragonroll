const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");

function hasCampaign(req, res, next){
    Campaign.findById(req.query.campaign).lean().then((campaign) => {
        CampaignUser.findOne({campaign, user: req.user}).lean().then((campaignUser) => {
            if(!campaignUser) {
                res.json({status: "error", msg: "not-found"})
                return;
            }
            req.cu = campaignUser;
            req.campaign = campaign;
            req.room = req.query.campaign;
            next();
        }).catch((err) => res.json({status: "error", err}));
    }).catch((err) => res.json({status: "error", err}));
}

function hasUser(req, res, next){
    
}

module.exports = {
    hasCampaign,
    hasUser
}