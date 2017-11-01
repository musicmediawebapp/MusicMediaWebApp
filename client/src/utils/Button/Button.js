import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        var { text, buttonStyles, handleOnClick } = this.props;
        return (
            <button className={buttonStyles} type="submit" onClick={handleOnClick}> 
                <span>{text}</span>
                <i className="material-icons right">done</i>
            </button>
        );
    }
}

export default Button;

