const Sequelize = require('sequelize')
const db = require('../dbconnection.js');
const Music = require ('./music.js');
const Category = require ('./category.js');

const MusicCategories = db.define('musicCateogries', {
    category: {
        type: Sequelize.STRING,
        references: {
            model: Category,
            key: 'category'
        }
    },
    music_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Music,
            key: 'id'
        }
    }
})

module.exports = MusicCategories;