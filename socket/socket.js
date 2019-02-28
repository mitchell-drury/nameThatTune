const Music = require('../server/db/models/music.js');
const Op = require('sequelize').Op;

module.exports = io => {
    io.on('connection', socket => {
        console.log('Hooked up!', socket.id)
    })
}