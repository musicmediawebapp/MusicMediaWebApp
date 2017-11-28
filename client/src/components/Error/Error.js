import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import errorToast from '../../utils/Toasts/default';
import s from './Error.css';

class Error extends Component {
    componentDidMount() {
        this.props.hideHeader();

        var { location } = this.props;
        // Toast the error message
        if (location.state && location.state.message) {
            toast(location.state.message);
        }
    }
    
    render() {
        return (
            <div className={s.error_background}>
                {errorToast}
            </div>
        );
    }
}

export default withRouter(Error);