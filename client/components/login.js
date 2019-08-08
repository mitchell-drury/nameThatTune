import React, {Component} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router';

export default class Login extends Component {
    constructor() {
        super ();

        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(event) {
        event.preventDefault();
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event) {
        event.preventDefault();
        this.setState({
            password: event.target.value
        })
    }

    handleLogin(event) {
        event.preventDefault();
        if (this.state.username != '' && this.state.password != '') {
            Axios.post('/account/login', {
                username: this.state.username.trim(),
                password: this.state.password.trim()
            }).then(response => {
                console.log('login response: ', response.data.message)
                if (response.data.token) {
                    window.sessionStorage.token = response.data.token;
                    this.setState({
                        loggedIn: true
                    })
                } 
            })
        }               
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to='/addSongs'/>
        } else {
            return (
                <div id='dataBaseLogin'>
                    <input type='text' placeholder='user' onChange = {this.handleUsernameChange}></input>

                    <input type='text' placeholder='password' onChange = {this.handlePasswordChange}></input>

                    <button id='login' type='submit' onClick = {this.handleLogin}> Login</button>
                </div>
            )
        }
    }
}