import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import Button from '../../utils/Button/Button';

class FormThirdPage extends Component {
    componentDidMount() {
        // Send an indicator that this is an update to the user model via workflow before submitting the form
        this.props.formValues.formType = "workflow";
    }

    render() {
        var { previousPage, formValues, submitWorkflow, history } = this.props;
        return (
            <div>
                I'm ready to start!
                <Button text="Previous" buttonStyles="orange btn-flat left white-text" type="button" handleOnClick={previousPage} />
                <div onClick={() => submitWorkflow(formValues, history)}>
                    <Button text="Next" buttonStyles="orange btn-flat right white-text" type="submit" />
                </div>
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