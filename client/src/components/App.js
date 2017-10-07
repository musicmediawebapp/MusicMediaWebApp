import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Component imports
import Header from './Header'; // Will always show this header

var Dashboard = () => <h2>Dashboard</h2> // Once logged in
var Landing = () => <h2>Landing</h2> // Note: when user goes to our site, this is below the header

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
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

// Param1: mapStateToProps
// Param2: action creators we want to wire up to this component. They're given to us as props.
export default connect(null, actions)(App);