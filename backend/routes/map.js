const express = require('express');
const router = express.Router();

const passport = require('passport');
const rateLimitMiddleware = require("../services/rate-limiter");

const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");
const Map = require("../models/Map");
const fs = require('fs');

const upload = require("../services/storage");
const { hasCampaign } = require('../services/middleware');

router.post('/create-resource', hasCampaign, upload.single("image"), (req, res) => {
    const imageName = req.file.filename;
    const data = req.cu;
    
    if(data.is_dm){
        res.json({
            status: "ok",
            data: imageName
        });
        return;
    } else {
        res.json({status: "error", msg: "not-dm"})    
    }

    return;
});

// rateLimitMiddleware?
router.post('/create', hasCampaign, (req, res) => {
    const data = req.cu;
    const campaign = req.campaign;

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
});

router.post('/update', hasCampaign, (req, res) => {
    const data = req.cu;
    const campaign = req.campaign;
    
    if(data.is_dm){
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
});

router.get('/list', hasCampaign, (req, res) => {
    const campaign = req.campaign;

    Map.find({campaign}).then(data => {
        res.json({status: "ok", data});
        return;
    }).catch(err => res.json({status: "error", msg: "internal"}));
});

router.get('/get', (req, res) => {
    
});

router.delete('/delete', (req, res) => {

});

module.exports = router;