const express = require('express');
const router = express.Router();

// Get characters from a campaign
router.get('/:plugin', (req, res) => {
    res.json({
        datagens: [
            {title: "Hello world"}
        ]
    }) 
});

module.exports = router;