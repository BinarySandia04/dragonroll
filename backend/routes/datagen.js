const express = require('express');
const DatagenCollection = require('../models/DatagenCollection');
const DatagenEntry = require('../models/DatagenEntry');
const router = express.Router();

// Get characters from a campaign
router.get('/:module', (req, res) => {
    let module = req.params.module;

    // Should trim this response
    DatagenCollection.find({module}).then(data => {
        res.json({datagens: data});
    }).catch(err => res.json({status: "err", err: err}));
});

router.get('/:module/:id/all', (req, res) => {
    let module = req.params.module;
    let id = req.params.id;

    console.log(module);
    console.log(id);

    DatagenCollection.find({module, id}).then(col => {
        if(!col) { res.json({status: "err", msg: "not found"}); return; }
        DatagenEntry.find({datagen_collection: col}).then(data => {
            res.json({elements: data});
        });
    }).catch(err => res.json({status: "err", err: err}));
})

module.exports = router;