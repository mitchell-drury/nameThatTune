#!/usr/bin/env node

const Music = require ('./models/music.js');
const Categories = require ('./models/category');
const MusicCategories = require ('./models/musicCategories');

Categories.bulkCreate([
    {category: 'pop'},
    {category: 'classical'},
    {category: 'top40'},
    {category: 'folk'},
    {category: 'traditional'},
    {category: 'popularSong'},
    {category: 'jazz'},
    {category: 'indie'},
    {category: 'movies'},
    {category: 'tv'},
    {category: '50s'},
    {category: '60s'},
    {category: '70s'},
    {category: '80s'},
    {category: '90s'},
    {category: '00s'},
    {category: '10s'},
])

Music.create({
    title: 'The Red River Valley',
    artist: 'Folk / Popular Song / Traditional'
})
.then (music => {
    MusicCategories.bulkCreate([
    {
        category: 'folk',
        music_id: music.id
    },
    {
        category: 'popularSong',
        music_id: music.id
    },
    {
        category: 'traditional',
        music_id: music.id
    }
    ])
})
