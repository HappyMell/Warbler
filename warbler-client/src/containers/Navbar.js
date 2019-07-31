import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/warbler-logo.png';
import { logout } from '../store/actions/auth';

class Navbar extends Component {
   

    logout = e => {
        e.preventDefault();
        this.props.logout();
    }
    

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm p-3 rounded">

                <div className="">
                    <Link to="/" className="navbar-brand">
                        <img src={Logo} alt="Warbler Home" />
                    </Link>
                </div>
                {this.props.authenticated ? (

                    <div className="navbar-nav ml-auto">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="navbar-collapse collapse justify-content-between" id="navbarSupportedContent" >
                            <ul className="nav navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>New Message</Link>
                                </li>
                                <li className="nav-item">
                                    <a onClick={this.logout}>Log Out</a>
                                </li>
                            </ul>


                        </div>

                    </div>

                ) : (
                        <div className="navbar-nav ml-auto">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="navbar-collapse collapse" id="navbarSupportedContent" >
                                <ul className="nav navbar-nav mr-auto">
                                    <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
                                    <li className="nav-item"><Link to="/signin">Log In</Link></li>
                                </ul>

                            </div>

                        </div>
                    )}

            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { logout })(Navbar)