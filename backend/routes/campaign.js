const express = require('express');
const router = express.Router();

const passport = require('passport');

const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");

const upload = require("../services/storage");

/*
router.post('/register', passport.authenticate('jwt', {session: false}), rateLimitMiddleware, (req, res) => {
});
*/
router.post('/create', (req, res) => {
    let {
        name,
        system
    } = req.body;

    if(!(name && system)){
        res.json({
            status: "error",
            msg: "params"
        });
        return;
    }

    // Create the campaign
    let campaign = new Campaign({name, system});
    campaign.invite_code = Campaign.generateInvite();

    campaign.save().then(campaign => {
        // Create relation with our user and set him as dm
        let campaignUser = new CampaignUser({
            user: req.user,
            campaign,
            is_dm: true
        });

        campaignUser.save().then(campaignUser => {
            res.json(campaign);
            return
        }).catch((err) => {res.json({status: "error", msg: "internal"})});
    }).catch((err) => {res.json({status: "error", msg: "internal"})});
});

router.post('/join', (req, res) => {
    let {
        invite_code
    } = req.body;

    if(!(invite_code)){
        res.json({
            status: "error",
            msg: "params"
        });
        return;
    }

    Campaign.findOne({invite_code}).then(campaign => {
        if(campaign){
            let campaignUser = new CampaignUser({
                user: req.user,
                campaign,
                is_dm: false
            });

            campaignUser.save().then(campaignUser => {
                res.json({status: "ok", campaign});
                return;
            });
        } else {
            res.json({
                status: "error",
                msg: "not valid"
            });
            return;
        }
    }).catch(err => res.json({status: "error", msg: "internal"}))
});

router.get('/list', (req, res) => {
    CampaignUser.find({user: req.user}).populate("campaign").lean().then((data) => {
        res.json(data);
        console.log(data);
        return;
    }).catch((err) => res.json({status: "error", msg: "internal"}));
});

router.get('/players', (req, res) => {
    Campaign.findById(req.query.campaign).lean().then((campaign) => {
        CampaignUser.find({campaign}).populate('user').then((data) => {
            console.log("djskajdk")
            console.log(data);
            res.json(data);
            return;
        }).catch((err) => res.json({status: "error", msg: "internal"}));
    }).catch((err) => res.json({status: "error", msg: "not-found"}));
});

router.put('/update', (req, res) => {
    CampaignUser.findOne({campaign: req.query.campaign, user: req.user}).then((data) => {
        if(data.is_dm){
            let {
                name,
                description
            } = req.body.campaign;
            Campaign.findOneAndUpdate({_id: req.query.campaign}, {
                name,
                description
            }).then((campaign) => {
                res.json({stauts: "ok", campaign})
            });
            return;
        }
        res.json({
            status: "error",
            msg: "forbidden"
        })
    });
    
});

module.exports = router;