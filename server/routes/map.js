const express = require('express');
const router = express.Router();

const passport = require('passport');
const rateLimitMiddleware = require("../config/rate-limiter");

const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");
const Map = require("../models/Map");
const fs = require('fs');

const upload = require("../config/storage");

router.post('/create-resource', upload.single("image"), passport.authenticate('jwt', {session: false}), (req, res) => {
    const imageName = req.file.filename;
    
    Campaign.findById(req.query.campaign).then((campaign) => {
        CampaignUser.findOne({campaign, user: req.user}).then((data) => {
            if(!data) {
                res.json({status: "error", msg: "not-found"})
                fs.unlink(imageName);
                return;
            }

            if(data.is_dm){
                res.json({
                    status: "ok",
                    data: imageName
                });
                return;
            }

            res.json({status: "error", msg: "not-dm"})
            fs.unlink(imageName);
            return;
        }).catch((err) => res.json({status: "error", msg: "not-found"}));
    }).catch((err) => res.json({status: "error", err}));
});

// rateLimitMiddleware?
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    Campaign.findById(req.body.campaign).then((campaign) => {
        CampaignUser.findOne({campaign, user: req.user}).then((data) => {
            if(!data) {
                res.json({status: "error", msg: "not-found"})
                return;
            }
            
            if(data.is_dm){
                let mapData = req.body.data;
                if(mapData){
                    let map = new Map({
                        data: mapData,
                        campaign
                    });
                    map.save().then(map => {
                        res.json({
                            status: "ok",
                            data: map
                        });
                        return;
                    });
                } else res.json({status: "error", msg: "args"})
                return;
            }
        }).catch((err) => res.json({status: "error", msg: "not-found"}));
    }).catch((err) => res.json({status: "error", err}));
});

router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {
    Campaign.findById(req.query.campaign).then((campaign) => {
        CampaignUser.findOne({campaign, user: req.user}).then((data) => {
            if(!data) {
                res.json({status: "error", msg: "not-found"})
                return;
            }
            
            if(data.is_dm){
                console.log("Ab");
                let mapData = req.body.data;
                if(mapData){
                    console.log("Map data:");
                    console.log(mapData)
                    Map.updateOne({_id: req.query.map, campaign}, {data: mapData}).then(map => {
                        res.json({
                            status: "ok",
                            data: map
                        });
                    });
                } else res.json({status: "error", msg: "args"})
                return;
            }
        }).catch((err) => res.json({status: "error", msg: "not-found"}));
    }).catch((err) => res.json({status: "error", err}));
});

router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
    Campaign.findById(req.query.campaign).then((campaign) => {
        CampaignUser.findOne({campaign, user: req.user}).then((data) => {
            if(!data) {
                res.json({status: "error", msg: "not-found"})
                return;
            }

            Map.find({campaign}).then(data => {
                res.json({status: "ok", data});
                return;
            }).catch(err => res.json({status: "error", msg: "internal"}));
        }).catch((err) => res.json({status: "error", msg: "not-found"}));
    }).catch((err) => res.json({status: "error", err}));
});

router.get('/get', passport.authenticate('jwt', {session: false}), (req, res) => {
    
});

router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {

});

module.exports = router;