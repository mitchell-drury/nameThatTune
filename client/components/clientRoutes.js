import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './home.js';
import io from 'socket.io-client';
import Axios from 'Axios'

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
                </Switch>
            </BrowserRouter> 
        )
    }
}