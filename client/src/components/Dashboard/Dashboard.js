import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import completeWorkflowToast from '../../utils/Toasts/default';

class Dashboard extends Component {

    componentDidMount() {
        var { location } = this.props;
        // Toast if the user just finished the workflow
        if (location.state && location.state.finishedWorkflow) {
            toast("You have completed the setup!");
        }
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                {completeWorkflowToast}
            </div>
        );
    }
}

export default withRouter(Dashboard);