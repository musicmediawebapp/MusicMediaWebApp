import React, { Component } from 'react';

class Landing extends Component {
    componentDidMount() {
        this.props.showHeader();
    }

    render() {
        return(
            <div>
                This is the page you see when you are at our landing page.
            </div>
        );
    }
}

export default Landing;