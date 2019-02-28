import React, {Component} from 'react';
import Sound from 'react-sound';
import Music from './music.js';
import Axios from 'Axios';

export default class Home extends Component {
    constructor () {
        super ();

        this.state = {
            title: 'Name That Tune',
            displayArtist: 'Artist/Composer: ?',
            playStatus: 'STOPPED',
            hintState: 'Hint',
            revealState: 'Reveal',
            currentTune: {},
            used: {},
            music: []
        }

        this.handleHint = this.handleHint.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
        this.finishedpLaying = this.finishedpLaying.bind(this);
    }

    componentWillMount () {
        Axios.get('../../api/music')
        .then(response => {
            let randomTune = response.data[Math.floor(Math.random()*response.data.length)]
            this.setState({
                music: response.data,
                currentTune: randomTune
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
                <Music image={this.state.currentTune.fileName}/>
                <div id='controls'>
                    <div id='hint' className='control' onClick={this.handleHint}>
                        {this.state.hintState}
                    </div>
                    <div id='reveal' className='control' onClick={this.handleReveal}>
                        {this.state.revealState}
                    </div>
                </div>
                <Sound url={'./audio/' +  this.state.currentTune.title + '.mp3'} playStatus={this.state.playStatus} onFinishedPlaying={this.finishedpLaying} loop={false}/>
            </div>
        )
    }

    handleHint() {
        if (this.state.hintState === 'Hint') {
            this.setState({hintState: 'Play', displayArtist: this.state.currentTune.artist})
        } else if (this.state.hintState === 'Play') {
            this.setState({playStatus: 'PLAYING', hintState: '(Playing)'})
        }
    }

    handleReveal() {
        if (this.state.revealState === 'Reveal') {
            this.setState({title: this.state.currentTune.title, displayArtist: this.state.currentTune.artist, revealState: 'Next Tune ->'})
        } else if (this.state.revealState === 'Next Tune ->') {
            let randomTune = Math.floor(Math.random()*this.state.music.length);
            this.setState({title: 'Name That Tune', displayArtist: 'Artist/Composer: ?', hintState: 'Hint', revealState: 'Reveal', playStatus: 'STOPPED', currentTune: this.state.music[randomTune]})
        }
    }

    finishedpLaying() {
        this.setState({hintState: 'Play', playStatus: 'STOPPED'});
    }
}