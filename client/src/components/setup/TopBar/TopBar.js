import React, { Component } from 'react';
import './TopBar.css';

class TopBar extends Component {
    render() {
        return (
            <div className="p-30">
                <img src={require("../../../assets/music-media-logo.png")} alt="Music Media Logo" />
            </div>
        );
    }
}

export default TopBar;