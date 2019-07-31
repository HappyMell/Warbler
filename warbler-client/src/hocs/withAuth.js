import React, { Component } from 'react';
import { connect } from 'react-redux';
import {base, app} from '../services/api';


export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        constructor() {
            super();
            this.state= {
                loading: true,
               messages: {},
               authenticated: false,            
               
            }
        }

        componentWillMount () {
            this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
                if(user) {
                    this.setState({
                        authenticated: true,
                        loading: false
                    })
                } else {
                    this.setState({
                        authenticated: false,
                        loading: false
                    })
                }
            })
            this.messageRef = base.syncState('messages', {
                context: this,
                state: 'messages'
            })
        }
    
        componentWillUnmount() {
            this.removeAuthListener();
            base.removeBinding(this.messageRef);
        }

        /*
        componentWillMount() {
            if (this.props.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
        }
        componentWillUpdate(nextProps) {
            if (nextProps.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
            
        }
        */
        render() {
            return <ComponentToBeRendered {...this.props} />
        }
        
    }
    function mapStateToProps(state) {
        return { isAuthenticated: state.currentUser.isAuthenticated }
        
    }
    


    return connect(mapStateToProps)(Authenticate);
    
    

}

