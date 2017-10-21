import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../RenderField';
import './FormSecondPage.css';
import validate from '../../utils/validateWorkflow';

class FormSecondPage extends Component {
    renderFields() {
        return (
            <div>
                <Field type="text" label="Phone number" name="phoneNumber" component={RenderField} />
                <label>
                    <Field type="radio" label="Male" name="sex" component={RenderField} value="male" />
                </label>
                <label>
                    <Field type="radio" label="Female" name="sex" component={RenderField} value="female" />
                </label>
                <Field type="text" label="Location" name="location" component={RenderField} />
            </div>
        );
    }

    render() {
        var { previousPage, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {this.renderFields()}
                <button className="teal btn-flat left white-text" type="button" onClick={previousPage}>
                    Previous
                </button>
                <button className="teal btn-flat right white-text" type="submit">
                    Next
                <i className="material-icons right">done</i>
                </button>
            </form>
        );
    }
}
    
export default reduxForm({
    form: 'workflowForm',
    destroyOnUnmount: false,
    validate
})(FormSecondPage);