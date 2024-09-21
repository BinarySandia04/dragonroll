const express = require('express');
const router = express.Router();

const passport = require('passport');
const rateLimitMiddleware = require("../config/rate-limiter");

const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");
const Character = require('../models/Character');

const upload = require("../config/storage");

// Get characters from a campaign
router.get('/list', (req, res) => {
    
});

// Character info
router.post('/create', rateLimitMiddleware, (req, res) => {
    
});

router.delete('/delete', rateLimitMiddleware, (req, res) => {

});

router.get('/get', (req, res) => {
    
});

router.put('/update', (req, res) => {
    
});

module.exports = router;