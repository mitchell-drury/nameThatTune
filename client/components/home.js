import React, {Component} from 'react';
import Sound from 'react-sound';
import Music from './music.js';
import Axios from 'Axios';

export default class Home extends Component {
    constructor() {
        super ();

        this.state = {
            title: 'Name That Tune',
            displayArtist: 'Artist/Composer: ?',
            playStatus: 'STOPPED',
            hintState: 'Hint',
            revealState: 'Reveal',
            currentMusic: {},
            music: []
        }

        this.handleHint = this.handleHint.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
        this.finishedPlaying = this.finishedPlaying.bind(this);
        this.selectRandomMusicAndSplice = this.selectRandomMusicAndSplice.bind(this);
        this.selectRandomMusic = this.selectRandomMusic.bind(this);
    }

    componentWillMount() {
        Axios.get('../../api/music')
        .then(response => {
            let reset = response.data[response.data.length-1];
            response.data.pop();
            let randomIndex = Math.floor(Math.random(response.data.length));
            let currentMusic = response.data[randomIndex];
            this.setState({
                currentMusic: currentMusic,
                musicList: response.data
            })
        })
    }

    render () {
        return (
            <div id='main'>
                <div id='title'>
                    {this.state.title}
                </div>
                <div id='artist'>
                {this.state.displayArtist}
                </div>
                <Music image={this.state.currentMusic.fileName}/>
                <div id='controls'>
                    <div id='hint' className='control' onClick={this.handleHint}>
                        {this.state.hintState}
                    </div>
                    <div id='reveal' className='control' onClick={this.handleReveal}>
                        {this.state.revealState}
                    </div>
                </div>
                <Sound url={'./audio/' +  this.state.currentMusic.title + '.mp3'} playStatus={this.state.playStatus} onFinishedPlaying={this.finishedPlaying} loop={false}/>
            </div>
        )
    }

    handleHint() {
        if (this.state.hintState === 'Hint') {
            this.setState({hintState: 'Play', displayArtist: this.state.currentMusic.artist})
        } else if (this.state.hintState === 'Play') {
            this.setState({playStatus: 'PLAYING', hintState: '(Playing)'})
        }
    }

    handleReveal() {
        if (this.state.revealState === 'Reveal') {
            this.setState({title: this.state.currentMusic.title, displayArtist: this.state.currentMusic.artist, hintState: 'Play', revealState: 'Next Tune ->'})
        } else if (this.state.revealState === 'Next Tune ->') {
            this.setState({title: 'Name That Tune', displayArtist: 'Artist/Composer: ?', hintState: 'Hint', revealState: 'Reveal', playStatus: 'STOPPED', currentMusic: this.selectRandomMusic()})
        }
    }

    finishedPlaying() {
        this.setState({hintState: 'Play', playStatus: 'STOPPED'});
    }

    selectRandomMusicAndSplice(reset, musicList) {
        console.log('music list: ', musicList)
        if(reset) {
            localStorage.setItem('music', JSON.stringify(musicList));
            console.log('local reset: ', localStorage.getItem('music'));
        };
        let localMusicArray = JSON.parse(localStorage.getItem('music'));
        console.log('pre splice: ', localMusicArray)
        let randomMusicIndex = Math.floor(Math.random()*localMusicArray.length);
        console.log('random: ', randomMusicIndex);
        let randomMusic = localMusicArray.splice(randomMusicIndex, 1);
        console.log('music object: ', randomMusic);
        console.log('post splice: ', localMusicArray)
        localStorage.setItem('music', JSON.stringify(localMusicArray));
        if (localMusicArray.length === 0) {
            Axios.get('../../api/music')
            .then(response => {
                response.data.pop();
                localStorage.setItem('music', JSON.stringify(response.data))
            })
        }
        return randomMusic[0];       
    }

    selectRandomMusic() {
        let randomIndex = Math.floor(Math.random()*this.state.musicList.length);
        let song = this.state.musicList[randomIndex];
        console.log(randomIndex, song);
        return song;
    }
}