const Sequelize = require('sequelize')
const db = require('../dbconnection.js');

const Music = db.define('music', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  artist: {
    type: Sequelize.STRING
  },
  difficulty: {
    type: Sequelize.FLOAT,
    defaultValue: 5
  },
  instagramDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.now
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.now
  }
})

module.exports = Music;
