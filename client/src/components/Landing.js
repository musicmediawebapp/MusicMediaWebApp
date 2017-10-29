import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Landing.css';

class Landing extends Component {
    render() {
        return(
            <div>
                <div id="background">
                    <img src={require('../assets/images/landing-temp.jpg')} alt="" />  
                    
                    <div id="now-playing">
                    <ul id="now-playing-text">You're listening to</ul>
                    <img src={require('../assets/images/album-temp.jpg')} alt="" />
                </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(Landing);