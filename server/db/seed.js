#!/usr/bin/env node
const crypto = require('crypto');
const musKey = require('./models/associations.js')
//const Music = require ('./models/music.js');
//const Keyword = require ('./models/keyword.js');
const User = require ('./models/user.js');


let songs = [
    {title: 'Send My Love', artist: 'Adele', tags: ['pop', '10s', 'top40']},
    {title: 'Teenage Dream', artist: 'Katy Perry', tags: ['pop', 'top40']},
    {title: 'Your Song', artist: 'Elton John'},
    {title: 'You Can Call Me Al', artist: 'Paul Simon', tags: ['80s', 'pop']},
    {title: 'The Red River Valley', artist: 'Traditional / Folk / Popular Song'}
]

let promises = [];

musKey.Keyword.bulkCreate([
    {keyword: 'pop'},
    {keyword: 'classical'},
    {keyword: 'top40'},
    {keyword: 'folk'},
    {keyword: 'traditional'},
    {keyword: 'popularSong'},
    {keyword: 'jazz'},
    {keyword: 'indie'},
    {keyword: 'movies'},
    {keyword: 'tv'},
    {keyword: '50s'},
    {keyword: '60s'},
    {keyword: '70s'},
    {keyword: '80s'},
    {keyword: '90s'},
    {keyword: '00s'},
    {keyword: '10s'},
])
.then(() => {
    songs.forEach(song => {
        musKey.Music.create({
            title: song.title,
            artist: song.artist
        })
        .then(music => {
            if(song.tags){
                song.tags.forEach(tag => {
                    musKey.Keyword.findOne({
                        where: {
                            keyword: tag
                        }
                    })
                    .then(tag => {
                        music.addKeyword(tag);
                    })
                })
            }
            
        })
    })
})

promises.push(User.create({
    username: 'mitchell.drury',
    password: 'password',
    isAdmin: true
}));

// Promise.all(promises).then(values => {
//     process.exit();
// })

