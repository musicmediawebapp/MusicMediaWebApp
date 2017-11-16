import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import completeWorkflowToast from '../../utils/Toasts/default';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import './Dashboard.css';

class Dashboard extends Component {

    componentDidMount() {
        this.props.showHeader();
        // Update the user model so that components like the Profile can pre-load the up-to-date model
        this.props.fetchUser();

        var { location } = this.props;
        // Toast if the user just finished the workflow
        if (location.state && location.state.finishedWorkflow) {
            toast("You have completed the setup!");
        }
    }

    render() {
        return (
            <div className="container-bg">      
                {completeWorkflowToast}

                <div className="carousel-suggested-container-container">
                        <div className="carousel-suggested-container">
                            <div className="background-gradient">
                                <div className="song-player-container">
                                    <div className="artwork-wrapper">
                                        <img src={require('../../assets/album-temp.png')}/>
                                    </div>
                                </div>
                                <div className="username-title-container"> 
                                    <div className="track-title">Shipwreck - The Coast</div>
                                    <div className="track-username">testuser201</div>
                                </div> 
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(withRouter(Dashboard));