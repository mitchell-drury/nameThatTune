import React, {Component} from 'react';

export default class Home extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <div id='controls'>
                <div id='hint'>
                    Hint
                </div>
                <div id='reveal'>
                    Reveal
                </div>
            </div>
        )
    }
}