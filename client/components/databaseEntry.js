import React, {Component} from 'react';
import Axios from 'axios';

export default class Home extends Component {
    constructor() {
        super ();

        this.state = {
            loggedIn: false
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <div> 
                    Logged In!
                </div>
            )
        } else {
            return (
                <div id='dataBaseLogin'>
                    <input type='text' placeholder='user'></input>

                    <input type='text' placeholder='password'></input>
                </div>
            )
        }
    }
}