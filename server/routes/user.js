const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/keys').secret;
const rateLimitMiddleware = require("../config/rate-limiter");
const { default: jwtDecode } = require('jwt-decode');

const User = require("../models/User");

const upload = require("../config/storage");

router.post('/register', rateLimitMiddleware, (req, res) => {
    let {
        name,
        username,
        email,
        password
    } = req.body;

    if(!(name && username && email && password)){
        res.json({
            error: true,
            msg: "params"
        });
        return;
    }

    User.findOne({username: username}).then((user) => {
        if(user){
            res.json({
                error: true,
                msg: "already-exists"
            });
        } else {
            User.findOne({email: email}).then((user) => {
                if(user){
                    res.json({
                        error: true,
                        msg: "already-email"
                    });
                } else {
                    var user = new User({
                        name: name,
                        username: username,
                        password: password,
                        email: email
                    });
                
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if(err) throw err;
                            user.password = hash;
                            user.save().then(user => {
                                res.json({
                                    success: true
                                });
                                return;
                            }).catch((error) => { res.json({ error: true }); return; });
                        });
                    })
                }
            }).catch((error) => { res.json({ error: true, msg: "Hi ha hagut un error intern, prova-ho més tard" }); return; });
        }
    }).catch((error) => { res.json({ error: true, msg: "Hi ha hagut un error intern, prova-ho més tard" }); return; });

});

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

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = req.headers.authorization.slice(7);
    const payload = jwtDecode(token);
    console.log(payload);
    
    res.json({
        msg: "MIAU!!!!"
    });
    return;
});

router.post("/upload-avatar", upload.single("image"), passport.authenticate('jwt', {session: false}), (req, res) => {
    const imageName = req.file.filename;
    console.log(req.body);

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

module.exports = router;