import React, {Component} from 'react';

export default class Home extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <div id='music'>
                <img src={'./music/' + this.props.image}/>
            </div>
        )
    }
}