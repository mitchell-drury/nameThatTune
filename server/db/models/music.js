const Sequelize = require('sequelize')
const db = require('../dbconnection.js');

const Music = db.define('music', {
  fileName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  soundFile: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  difficulty: {
    type: Sequelize.FLOAT,
    defaultValue: 5
  }
})

module.exports = Music;
