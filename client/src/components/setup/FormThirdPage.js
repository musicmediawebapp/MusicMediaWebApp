import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class FormThirdPage extends Component {
    render() {
        var { previousPage, formValues, submitWorkflow, history } = this.props;
        return (
            <div>
                I'm ready to start!
                <button className="teal btn-flat left white-text" type="button" onClick={previousPage}>
                    Previous
                </button>
                <button className="teal btn-flat right white-text" onClick={() => submitWorkflow(formValues, history)}>
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </div>
        );
    }
}

// We use the "connect" library to reach this redux-form reducer
function mapStateToProps({ form: { workflowForm } }) {
    return {
        formValues: workflowForm.values
    };
}

/* mapStateToProps (access to reducers), actions (returned actions) */
export default connect(mapStateToProps, actions)(withRouter(FormThirdPage));