const express = require('express');
const router = express.Router();

const { isAdmin } = require('../config/middleware');
const User = require("../models/User");

router.get('/users', isAdmin, (req, res) => {
    console.log("HJDSHAKJDHKH")
    User.find({}).then((users) => {
        console.log("HJDSHAKJDHKH2")
        res.json({
            users
        });
    });
})

module.exports = router;