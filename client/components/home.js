import React, {Component} from 'react';
import Music from './music.js';
import Controls from './controls.js';

export default class Home extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <div id='main'>
                <div id='title'>
                    Name That Tune
                </div>
                <Music image='Snippet'/>
                <Controls />
            </div>
        )
    }
}