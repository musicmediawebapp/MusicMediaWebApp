import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class Dashboard extends Component {

    componentDidMount() {
        var { location } = this.props;
        // Toast if the user just finished the workflow
        if (location.state && location.state.finishedWorkflow) {
            toast("You have completed the setup!");
        }
    }

    renderToasts() {
        return (
            <ToastContainer 
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            />
        );
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                {this.renderToasts()}
            </div>
        );
    }
}

export default withRouter(Dashboard);