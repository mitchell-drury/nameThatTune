import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Axios from 'axios';

export default class AddSongs extends Component {
    constructor() {
        super ();
        this.state = {
            redirect: false,
            songs: [],
            filteredSongs: [],
            title: '',
            artist: '',
            instagramDate: '',
            keywords: ''
        }

        this.addSong = this.addSong.bind(this)
        this.handleTitleSearch = this.handleTitleSearch.bind(this);
        this.handleArtistSearch = this.handleArtistSearch.bind(this);
    }

    componentDidMount() {
        Axios.get('/api/getSongs', {
            token: window.sessionStorage.token
        })
        .then(data => {
            this.setState({
                songs: data.data
            })
            console.log('songs returned: ', data.data)
        })
    }

    addSong() {
        if(window.sessionStorage.token){
            if(this.state.title != '' && this.state.artist != '') {
                Axios.post('/api/addSong', {
                    title: this.state.title,
                    artist: this.state.artist,
                    keywords: this.state.keywords,
                    instagramDate: this.state.instagramDate,
                    token: window.sessionStorage.token
                })
                .then(data => {
                    if (data.data.message === 'invalid token'){
                        console.log('setting reidierect');
                        this.setState({
                            redirect: true
                        })
                    }
                })
            }
        } else {
            this.setState({
                redirect: true
            })
            console.log('no login token');
        }
    }

    handleTitleSearch(event) {
        //do some regex for what's in the box
        if(event.target.value.trim() === ''){
            this.setState({filteredSongs: []})
        } else {
            let filteredSongs = this.state.songs.filter(song => song.title.indexOf(event.target.value.trim()) + 1 > 0);
            this.setState(
                {filteredSongs: filteredSongs, 
                title: event.target.value}); 
        }
    }

    handleArtistSearch(event) {
        //do some regex for what's in the box
        if(event.target.value.trim() === ''){
            this.setState({filteredSongs: []})
        } else {
            let filteredSongs = this.state.songs.filter(song => song.artist.indexOf(event.target.value.trim()) + 1 > 0);
            this.setState(
                {filteredSongs: filteredSongs, 
                artist: event.target.value}); 
        }
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to='/login'/>;
        }
        let songList = this.state.filteredSongs.map((song) => 
            <li key={song.title}>{song.title} by {song.artist}</li>
        )
        return (
            <div id='addSongInterface'>
                <input type='text' onChange={this.handleTitleSearch} placeholder={'Song Title'}></input>
                <input type='text' onChange={this.handleArtistSearch}placeholder={'Artist/Composer'}></input>
                <input type='text' onChange={this.handleKeywordSearch} placeholder={'Keyowrds: 90\'s, pop, classical'}></input> 
                <input type='text' placeholder={'mm/dd/yyyy'}></input>
                <button type='submit' onClick={this.addSong}>Add Song</button>

                <div id='searchResults'>
                    search results
                    <ul>{songList}</ul>
                </div>
            </div>
        )
    }
}
