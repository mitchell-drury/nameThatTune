const express = require('express');
const apiRouter = express.Router();
const Music = require('../db/models/music.js')
const Op = require('sequelize').Op;

apiRouter.get('/music', function(req, res) {
    console.log(req.session.cookie);
    Music.findAll()
    .then(results => {
        let resetMusic = req.session.cookie ? true : false;
        results.push({resetMusic: resetMusic});
        res.json(results);
    })
})

module.exports = apiRouter;