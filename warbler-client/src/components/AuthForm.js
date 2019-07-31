import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {Toaster, Intent} from '@blueprintjs/core';
import {app, facebookProvider} from '../services/api';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            authenticated: false,
            email: "",
            username: "",
            password: "",
        };
    }

    authWithFacebook = () => {
        app.auth().signInWithPopup(facebookProvider)
        .then((result, err) => {
            if(err) {
                this.toaster.show({intent: Intent.DANGER, message: "Unable to sign in with Facebook"})
            } else {
                this.setState({redirect: true})
            }
        })
    }

    authWithEmailPassword = e => {
        e.preventDefault();
        console.log("Authed with Email")
        console.table([{
            email: this.emailInput.value,
            password: this.passwordInput.value
        }])
    }

   

    render() {
       const {from} = this.props.location.state || {from: {pathname: '/'}}
       const { email, username, password, redirect} = this.state;


        const { heading, buttonText, errors, history, removeError, onAuth, signUp } = this.props;
     
        
        history.listen(() => {
            removeError();
        })
        
        if(redirect) {
            return (
            <Redirect to={from} />
            )
        }
        return (
            <div className="container">
                <div className="row jusitfy-content-md-center text-center">
                    <div className="col-sm-6">
                        <form onSubmit={(e) => {this.authWithEmailPassword(e)}}  ref={(form) => {this.loginForm = form}}>
                            <div className="form-group shadow-sm mb-3">
                                <h2>{heading}</h2>
                                <Toaster ref={(e) => {this.toaster = e}} />
                                {errors.message && (
                                    <div className="alert alert-danger">{errors.message}</div>
                                )}
                                {this.props.signUp ? (
                                    <div>
                                        < div className="form-group-two" >
                                            <input autoComplete="off" className="form-control" placeholder="email" id="email" name="email" type="text" value={email}  ref={(input) => {this.emailInput = input}} onChange={this.handleChange} />
                                            <input autoComplete="off" className="form-control" placeholder="password" id="password" name="password" type="password" ref={(input) => {this.passwordInput = input}}  onChange={this.handleChange} value={password} />
                                            <input autoComplete="off" className="form-control" placeholder="username" id="username" name="username" type="text"  ref={(input) => {this.usernameInput = input}} value={username} onChange={this.handleChange} />
                                         
                                        </div >
                                        <div className="login-info">
                                            <button type="submit" className="logging-btn  btn btn-primary btn-md float-left">{buttonText}</button>
                                            <button className="btn btn-primary btn-md btn-md float-left" onClick={() => {this.authWithFacebook()}}>Sign up with Facebook</button>

                                        </div>
                                    </div>
                                ) : (
                                        < div className="form-group-two" >
                                            <input autoComplete="off" className="form-control" placeholder="email" id="email" name="email" type="text" value={email}  ref={(input) => {this.emailInput = input}} onChange={this.handleChange} />
                                            <input autoComplete="off" className="form-control" placeholder="password" id="password" name="password" type="password" ref={(input) => {this.passwordInput = input}}  onChange={this.handleChange} value={password} />
                                            <button type="submit" className="logging-btn  btn btn-primary btn-md float-left">{buttonText}</button>
                                            <button className="btn btn-primary btn-md btn-md float-left" onClick={() => {this.authWithFacebook()}}>Sign in with Facebook</button>


                                            <div className="mt-4">
                                                <p>New to Warbler? <Link to="signup">Sign up</Link></p>

                                            </div>
                                        </div>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

/*
handleSubmit = e => {
    e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
             this.props
        .onAuth(authType, this.state)
        .then(() => {
            this.props.history.push("/");
        })
        .catch(() => {
            return;
        })
}

handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value,
    })
}    

*/
AuthForm.propTypes = {
    buttonText: PropTypes.string,
    errors: PropTypes.object,
    heading: PropTypes.string,
    history: PropTypes.object,
    onAuth: PropTypes.func,
    signIn: PropTypes.bool,
    removeError: PropTypes.func
};

export default AuthForm