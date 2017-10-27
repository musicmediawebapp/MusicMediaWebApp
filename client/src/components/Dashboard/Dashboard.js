import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Materialize from 

class Dashboard extends Component {

    componentDidMount() {
        var { finishedWorkflow } = this.props.location.state;
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
            </div>
        );
    }
}

export default withRouter(Dashboard);