import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class Dashboard extends Component {

    componentDidMount() {
        var { location } = this.props;
        if (location.state && location.state.finishedWorkflow) {
            toast("You have completed the setup!");
        }
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>

                {/* Toast if the user just finished the workflow */}
                <ToastContainer 
                    position="top-right"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </div>
        );
    }
}

export default withRouter(Dashboard);