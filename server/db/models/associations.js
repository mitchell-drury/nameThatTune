const Music = require ('./music.js');
const Keyword = require ('./keyword.js');

//set associations here
Music.belongsToMany(Keyword, {through: 'MusicKeyword'});
Keyword.belongsToMany(Music, {through: 'MusicKeyword'});

module.exports = {Music, Keyword};