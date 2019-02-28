const express = require('express');
const apiRouter = express.Router();
const Music = require('../db/models/music.js')
const Op = require('sequelize').Op;

apiRouter.get('/music', function(req, res) {
    Music.findAll()
    .then(results => {
        res.json(results);
    })
})

module.exports = apiRouter;