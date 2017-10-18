import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Component imports
import Header from './Header'; // Will always show this header
import Landing from './Landing'; // Below header in the front page

var Dashboard = () => <h2>Dashboard</h2> // Once logged in

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
                        {/* The langing page users see when they're not logged in */}
                        <Route exact path="/" component={Landing} />

                        {/* Once the user is logged in, all of the app's features and functionality is here */}
                        <Route exact path="/dashboard" component={Dashboard} />

                        {/* This route is the setup workflow */}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

// Param1: mapStateToProps
// Param2: action creators we want to wire up to this component. They're given to us as props.
export default connect(null, actions)(App);