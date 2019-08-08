const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../../secrets.js')
const Music = require('../db/models/music.js')
const Keyword = require('../db/models/keyword.js');

apiRouter.post('/addSong', function(req, res) {
    console.log('request req token: ', req.body.token);
    try {
        verified = jwt.verify(req.body.token, key.tokenKey);
        console.log('verified:', verified);
    } catch (err) {
        console.log('token validation error, redirecting to login');
        res.status(200).json({message: 'invalid token'})
    }
    try {
        Music.create({
            title: req.body.title,
            artist: req.body.artist
        })
        .then(music => {
            res.status(200).json(music);
        })
    } catch (err) {
        console.log(err)
    }
})

apiRouter.get('/getSongs', function(req, res) {
    console.log('getting songs');
    // try {
    //     verified = jwt.verify(req.body.token, key.tokenKey);
    //     console.log('verified:', verified);
    // } catch (err) {
    //     console.log('token validation error, redirecting to login');
    //     res.status(200).json({message: 'invalid token'})
    // }
    Music.findAll({include: [Keyword]})
    .then(songs => {
        res.json(songs);
    })
})

module.exports = apiRouter;