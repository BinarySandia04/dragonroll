const express = require('express');
const router = express.Router();

const Concept = require('../models/Concept');
const { hasCampaign } = require('../services/middleware');
const { getIo } = require('../io/socket');

const io = getIo();

router.get('/list', hasCampaign, (req, res) => {
    const campaign = req.campaign;
    Concept.find({campaign}).select('-data').lean().then(data => {
        res.json({status: "ok", data});
    });
});

router.post('/create', hasCampaign, (req, res) => {
    const campaign = req.campaign;
    let data = req.body.data;
    
    if(!(data.type && data.name)) {
        res.json({status: "error", msg: "args"});
        return;
    }

    let concept = new Concept({campaign, type: data.type, name: data.name});
    concept.save().then(concept => {
        io.to(req.room).emit('update-concepts');
        res.json({status: "ok", concept});
    })
});

router.delete('/delete', hasCampaign, (req, res) => {
    const campaign = req.campaign;
    let id = req.query.id;
    if(!id) {
        res.json({status: "error", msg: "args"});
        return;
    }

    Concept.deleteOne({_id: id, campaign}).then(() => {
        io.to(req.room).emit('update-concepts');
        res.json({status: "ok"});
    });
});

router.get('/get', hasCampaign, (req, res) => {
    const campaign = req.campaign;
    let id = req.query.id;

    Concept.findOne({_id: id, campaign}).lean().then(concept => {
        res.json({status: "ok", concept});
    });
});

router.put('/update', hasCampaign, (req, res) => {
    const campaign = req.campaign;
    let id = req.query.id;

    Concept.findOneAndUpdate({_id: id, campaign}, req.body.concept).then(result => {
        console.log(req.room)
        if(req.query.fireUpdate) io.to(req.room).emit('update-concepts');
        io.to(req.room).emit('update-concept', id);
        res.json({status: "ok"});
    });
});

module.exports = router;