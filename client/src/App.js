import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="/api/test">Click here to see a response from Express backend</a>
      </div>
    );
  }
}

export default App;
