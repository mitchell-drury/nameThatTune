import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home.js';
import Login from './login.js';
import AddSongs from './addSongs.js';
import io from 'socket.io-client';

const socket = io()

socket.on('connect', () => {
    console.log('Connected!, My Socket Id:', socket.id)
})

export default class ClientRoutes extends Component {
    constructor () {
        super ();
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Home />}/>
                    <Route exact path="/login" render={() => <Login/>}/>
                    <Route exact path="/addSongs" render={() => <AddSongs/>}/>
                </Switch>
            </BrowserRouter> 
        )
    }
}