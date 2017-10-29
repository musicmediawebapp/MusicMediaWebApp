import 'materialize-css/dist/css/materialize.min.css'; // Imports CSS. Webpack will find this and load it.
import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

/* React DOM's whole purpose is to make sure React can be rendered on the DOM */
import ReactDOM from 'react-dom';

import App from './components/App';
import reducers from './reducers';

// Hooks up all reducers to the store
// redux-thunk will inspect if any Action Creators return an action. If they do, it calls dispatch for the reducers.
var store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/* Param1: Root React component instance, Param2: index.html reference that hosts these components */
// Our provider contains a store that contains our reducers
// The provider also wraps around our root component so that our components are connected to the reducer's states
// And will be updated (VIA the provider) the new states
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);