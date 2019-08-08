const express = require('express');
const accountRouter = express.Router();
const User = require('../db/models/user.js');
const jwt = require('jsonwebtoken');
const key = require('../../secrets.js')

accountRouter.post('/login', function(req, res){
    User.findOne({where: {username: req.body.username}})
    .then(user => {
        if(user) {
            if(user.correctPassword(req.body.password)){
                var token = jwt.sign({userId:user.id, username: user.username, loginState:true},key.tokenKey, {expiresIn: 60*60*24});
                res.status(200).json({
                    message: 'Logged In :)',
                    token
                })
                console.log('new login token: ', token);
            } else {
                res.status(200).json({message: 'Invalid Credentials'})
            }
        } else {
            res.status(200).json({message: 'No such user'})
        }
    })
})

// accountRouter.post('/addSong')

module.exports = accountRouter;