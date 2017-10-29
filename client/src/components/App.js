import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Switch } from 'react-router';
import history from './utils/History';
import '../styles/global.css';

// Component imports
import Header from './Header'; // Will always show this header
import Landing from './Landing'; // Below header in the front page
import Workflow from './setup/Workflow';
import Error from './Error/Error';
import Dashboard from './Dashboard/Dashboard';
import Personal from './Personal/Personal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentURL: "/"
        }
    }
    componentDidMount() {
        this.props.fetchUser();

        // Listen to the URL for route changes and update the currentURL state accordingly
        this.unlisten = history.listen((location) => {
            this.setState({ currentURL: location.pathname });
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
                        {/* Do not show the header when we're in the errors page */}
                        {this.state.currentURL.includes('error') ? null : <Header />}
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
                </Router>
            </div>
        );
    }
};

// Param1: mapStateToProps
// Param2: action creators we want to wire up to this component. They're given to us as props.
export default connect(null, actions)(App);