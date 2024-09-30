const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/keys').secret;
const rateLimitMiddleware = require("../config/rate-limiter");
const { default: jwtDecode } = require('jwt-decode');
const crypto = require("crypto");

const { isAdmin } = require('../config/middleware');

const User = require("../models/User");

const upload = require("../config/storage");

// Admin registers new user
router.post('/register', isAdmin, (req, res) => {
    let setupCode = crypto.randomBytes(64).toString('base64url');
    
    let user = new User({
        admin: false,
        name: crypto.randomBytes(16).toString('base64url'),
        username: crypto.randomBytes(16).toString('base64url'),
        email: crypto.randomBytes(16).toString('base64url'),
        setupCode
    });

    user.save().then(user => {
        res.json({
            status: "ok",
            code: setupCode,
        });
    }).catch({status: "err", msg: "internal"})
});

// User gets if setup account exists given the query code
router.get('/verify-setup', (req, res) => {
    User.findOne({setupCode: req.query.code}).then(user => {
        if(user){
            res.json({status: "ok", code: req.query.code});
        } else {
            res.json({status: "err", msg: "not-exists"})
        }
    });
});

// User posts the parameters of his new account given by admin
router.post('/setup', rateLimitMiddleware, (req, res) => {
    let {
        name,
        username,
        email,
        password
    } = req.body;
    let setupCode = req.query.code;

    if(!(name && username && email && password && setupCode)){
        res.json({
            error: true,
            msg: "params"
        });
        return;
    }

    User.findOne({setupCode}).then((user) => {
        User.findOne({email: email}).then((sameUser) => {
            if(sameUser){
                res.json({
                    error: true,
                    msg: "already-email"
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;
                        user.password = hash;
                        user.username = username;
                        user.email = email;
                        user.setupCode = undefined;

                        user.save().then(user => {
                            res.json({
                                success: true
                            });
                            return;
                        }).catch((error) => { res.json({ error: true }); return; });
                    });
                })
            }
        }).catch((error) => { res.json({ error: true, msg: "internal" }); return; });
    }).catch((error) => { res.json({ error: true, msg: "internal" }); return; });
});

// Login post
router.post('/login', rateLimitMiddleware, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!(username && password)){
        res.json({
            error: true,
            msg: "params"
        });
        return;
    }
    User.findOne({ username: req.body.username}).then((user) => {
        if(!user){
            res.json({
                error: true,
                msg: "wrong"
            });
            return;
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                    settings: user.settings
                }
                jwt.sign(payload, secret, {
                    expiresIn: 172800
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: token,
                        msg: "success"
                    });
                    return;
                });
            } else {
                res.json({
                    error: true,
                    msg: "wrong"
                });
            }
        });
    });
});

// Upload avatar post
router.post("/upload-avatar", upload.single("image"), passport.authenticate('jwt', {session: false}), (req, res) => {
    const imageName = req.file.filename;

    User.updateOne(req.user, {image: imageName}).then(() => {
        res.json({
            msg: "uploaded",
            success: true
        });
    }).catch((err) => {
        res.json({
            msg: "internal",
            error: true
        });
    });
    
});

router.get("/retrieve-avatar", (req, res) => {
    User.findOne({username: req.query.username}).then((data) => {
        res.json({ status: "ok", image: data.image });
    }).catch((err) => {
        res.json({ status: "error" })
    });
});

router.get("/has-admin", (req, res) => {
    User.findOne({admin: true}).then((data) => {
        if(data) res.json({status: "ok"});
        else res.json({status: "init"});
    }).catch((err) => {
        res.json({ status: "error" });
    });
});

router.post("/update-settings", passport.authenticate('jwt', {session: false}), (req, res) => {
    User.updateOne(req.user, {settings: req.body.settings}).then(() => {
        res.json({
            status: "ok",
            settings: req.body.settings
        })
    }).catch((err) => {
        res.json({status: "error", msg: "internal"})
    });
});

router.get('/get-settings', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne(req.user).then((data) => {
        res.json({
            status: "ok",
            settings: data.settings
        });
    }).catch((err) => res.json({status: "error", msg: "internal"}));
})

module.exports = router;