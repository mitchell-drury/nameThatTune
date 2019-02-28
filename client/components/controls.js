import React, {Component} from 'react';

export default class Home extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <div id='controls'>
                <div id='hint' className='control'>
                    Hint
                </div>
                <div id='reveal' className='control'>
                    Reveal
                </div>
            </div>
        )
    }
}