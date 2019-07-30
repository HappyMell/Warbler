import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from './MessageTimeline';
import Logo from '../images/warbler-logo.png';


const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {
        return (

            <div className="home-hero">
                <div className="container-fluid h-100">
                    <div className="row h-100">

                        <div className="col cell-one">
                            <div className="signupBlock">
                                <img src={Logo} alt="Warbler bird" />
                                <h1>See whats happening in the world around you</h1>
                                <div>
                                    <h6 className="signupTitle">Join Warbler today</h6>
                                    <div className="buttons">
                                        <ul>
                                            <li> <Link to="/signup" role="button" className="btn btn-primary">Sign up</Link></li>
                                            <li><Link to="/signin" role="button" className="btn btn-outline-primary">Log In</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col cell-two">
                            <div className="communication">
                                <div className="communication-item">
                                    <span><i className="fas fa-search"></i></span>
                                    <p>Follow your interests.</p>
                                </div>
                                <div className="communication-item">
                                    <span><i className="fas fa-user-friends"></i></span>
                                    <p>Hear what people are talking about.</p>
                                </div>
                                <div className="communication-item">
                                    <span><i className="far fa-comment"></i></span>
                                    <p>Join the conversation.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        )
    }
    return <div>
        <MessageTimeline
           image={currentUser.user.url}
            username={currentUser.user.username} />
    </div>
}

export default Homepage