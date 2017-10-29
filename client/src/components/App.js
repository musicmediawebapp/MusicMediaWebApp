import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Switch } from 'react-router';
import styles from '../styles/global.css';
import history from './utils/History';

// Component imports
import Header from './Header'; // Will always show this header
import Landing from './Landing'; // Below header in the front page
import Workflow from './setup/Workflow';
import Error from './Error/Error';

var Dashboard = () => <h2>Dashboard</h2> // Once logged in

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();

        // Listen to the URL for route changes
        this.unlisten = history.listen((location) => {
            console.log(location);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <div className="container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            {/* The langing page users see when they're not logged in */}
                            <Route exact path="/" component={Landing} />

                            {/* Once the user is logged in, all of the app's features and functionality is here */}
                            <Route exact path="/dashboard" component={Dashboard} />

                            {/* This route is the setup workflow */}
                            <Route exact path="/workflow" component={Workflow} />

                            {/* This is for any explicit redirects to the Error page */}
                            <Route exact path="/error" component={Error} />
                            {/* Handle the edgecase in which the user types in a random URL or an unhandled URL */}
                            <Route exact path="*" component={Error} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
};

// Param1: mapStateToProps
// Param2: action creators we want to wire up to this component. They're given to us as props.
export default connect(null, actions)(App);