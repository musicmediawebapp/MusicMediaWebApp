import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Landing.css';

class Landing extends Component {
    render() {
        return(
            <div>
                <div id="background">
                    <img src={require('../assets/images/landing-temp.jpg')} alt="" />  
                    <ul id="main-text">You're listening to</ul>
                </div>
                <div> 
                    
                </div> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(Landing);