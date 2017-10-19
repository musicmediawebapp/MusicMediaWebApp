import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from './RenderField';

class FormSecondPage extends Component {
    renderFields() {
        return (
            <div>
                <Field type="text" label="Phone number" name="phoneNumber" component={RenderField} />
                <Field type="text" label="Gender" name="gender" component={RenderField} />
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
    destroyOnUnmount: false    
})(FormSecondPage);