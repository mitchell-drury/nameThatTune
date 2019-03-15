const Sequelize = require('sequelize')
const db = require('../dbconnection.js');

const Category = db.define('category', {
  category: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Category;