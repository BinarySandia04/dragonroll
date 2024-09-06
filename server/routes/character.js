const express = require('express');
const router = express.Router();

const passport = require('passport');
const rateLimitMiddleware = require("../config/rate-limiter");

const Campaign = require("../models/Campaign");
const CampaignUser = require("../models/CampaignUser");
const Character = require('../models/Character');

const upload = require("../config/storage");

// Get characters from a campaign
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res) => {
    
});

// Character info
router.post('/create', passport.authenticate('jwt', {session: false}), rateLimitMiddleware, (req, res) => {
    
});

router.delete('/delete', passport.authenticate('jwt', {session: false}), rateLimitMiddleware, (req, res) => {

});

router.get('/get', passport.authenticate('jwt', {session: false}), (req, res) => {
    
});

router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {
    
});

module.exports = router;