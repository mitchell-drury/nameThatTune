import React, {Component} from 'react';

export default class Home extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <div id='music'>
                <img src={'http://s3.amazonaws.com/readthatmusic/printedMusic/' + this.props.image}/>
            </div>
        )
    }
}