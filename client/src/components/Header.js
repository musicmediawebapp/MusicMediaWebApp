import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    renderContent() {
        // Access to the authReducer, which gives us the payload.action (User model)
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return <li><a href="/api/logout">Log out</a></li>;
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <Link 
                        to={this.props.auth ? '/dashboard' : '/'}
                        className="left brand-logo">
                        Music Media
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </div>
            
        );
    }
}

// This is how we access updated states from the reducers. "auth" matches our auth: authReducer naming
function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);