import React, {Component} from 'react';

export default class Home extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <div id='music'>
                <img src={'https://readthatmusic.s3-us-west-2.amazonaws.com/printedMusic/' + this.props.image}/>
            </div>
        )
    }
}