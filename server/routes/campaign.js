const express = require('express');
const router = express.Router();

const passport = require('passport');
const rateLimitMiddleware = require("../config/rate-limiter");

const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");

const upload = require("../config/storage");

/*
router.post('/register', passport.authenticate('jwt', {session: false}), rateLimitMiddleware, (req, res) => {
});
*/

router.post('/create', passport.authenticate('jwt', {session: false}), rateLimitMiddleware, (req, res) => {
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

router.post('/join', passport.authenticate('jwt', {session: false}), rateLimitMiddleware, (req, res) => {
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

router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
    CampaignUser.find({user: req.user}).populate("campaign").then((data) => {
        res.json(data);
        console.log(data);
        return;
    }).catch((err) => res.json({status: "error", msg: "internal"}));
});

router.get('/players', passport.authenticate('jwt', {session: false}), (req, res) => {
    Campaign.findById(req.query.campaign).then((campaign) => {
        CampaignUser.find({campaign}).populate('user').then((data) => {
            console.log("djskajdk")
            console.log(data);
            res.json(data);
            return;
        }).catch((err) => res.json({status: "error", msg: "internal"}));
    }).catch((err) => res.json({status: "error", msg: "not-found"}));
});

module.exports = router;