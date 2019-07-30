import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DropImage from '../containers/Dropzone';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
        };
    }

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

    render() {
        const { email, username, password} = this.state;
        const { heading, buttonText, errors, history, removeError } = this.props;
     

        history.listen(() => {
            removeError();
        })

        return (
            <div className="container">
                <div className="row jusitfy-content-md-center text-center">
                    <div className="col-sm-6">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group shadow-sm mb-3">
                                <h2>{heading}</h2>
                                {errors.message && (
                                    <div className="alert alert-danger">{errors.message}</div>
                                )}
                                {this.props.signUp ? (
                                    <div>
                                        < div className="form-group-two" >
                                            <input autoComplete="off" className="form-control" placeholder="email" id="email" name="email" type="text" value={email} onChange={this.handleChange} />
                                            <input autoComplete="off" className="form-control" placeholder="password" id="password" name="password" type="password" onChange={this.handleChange} value={password} />
                                            <input autoComplete="off" className="form-control" placeholder="username" id="username" name="username" type="text" value={username} onChange={this.handleChange} />
                                         <DropImage/>
                                        </div >
                                        <div className="login-info">
                                            <button type="submit" className="logging-btn  btn btn-primary btn-md float-left">{buttonText}</button>

                                        </div>
                                    </div>
                                ) : (
                                        < div className="form-group-two" >
                                            <input autoComplete="off" className="form-control" placeholder="email" id="email" name="email" type="text" value={email} onChange={this.handleChange} />
                                            <input autoComplete="off" className="form-control" placeholder="password" id="password" name="password" type="password" onChange={this.handleChange} value={password} />
                                            <button type="submit" className="logging-btn  btn btn-primary btn-md float-left">{buttonText}</button>

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