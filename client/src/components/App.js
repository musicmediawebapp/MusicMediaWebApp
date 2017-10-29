import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import { Switch } from 'react-router';
import '../styles/global.css';

// Component imports
import Header from './Header'; // Will always show this header
import Landing from './Landing'; // Below header in the front page
import Workflow from './setup/Workflow';
import Error from './Error/Error';
import Dashboard from './Dashboard/Dashboard';
import Personal from './Personal/Personal';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            {/* The landing page users see when they're not logged in */}
                            <Route exact path="/" component={Landing} />

                            {/* Once the user is logged in, all of the app's features and functionality is here */}
                            <Route exact path="/dashboard" component={Dashboard} />

                            {/* Users can look at their profile to update any personal information */}
                            <Route exact path="/profile/:id" component={Personal} />

                            {/* This route is the setup workflow */}
                            <Route exact path="/workflow" component={Workflow} />

                            {/* This is for any explicit redirects to the Error page */}
                            <Route exact path="/error" component={Error} />
                            {/* Handle the edgecase in which the user types in a random URL or an unhandled URL */}
                            <Route exact path="*" component={Error} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

// Param1: mapStateToProps
// Param2: action creators we want to wire up to this component. They're given to us as props.
export default connect(null, actions)(App);