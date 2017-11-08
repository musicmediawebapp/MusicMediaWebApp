import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import completeWorkflowToast from '../../utils/Toasts/default';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

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
            <div className="container">
                <h2>Dashboard</h2>
                {completeWorkflowToast}
            </div>
        );
    }
}

export default connect(null, actions)(withRouter(Dashboard));