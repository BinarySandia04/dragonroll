const express = require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const rateLimitMiddleware = require("../config/rate-limiter");

const { isAdmin } = require('../config/middleware');
const User = require("../models/User");

router.post('/register', rateLimitMiddleware, (req, res) => {
    User.findOne({admin: true}).then((data) => {
        if(!data) {
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
                                email: email,
                                admin: true
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
        }
    });
    
});

router.get('/users', isAdmin, (req, res) => {
    User.find({}).then((users) => {
        res.json({
            users
        });
    });
})

module.exports = router;