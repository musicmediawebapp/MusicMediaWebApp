import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from './RenderField/RenderField';
import validate from '../utils/validateWorkflow';

class FormFirstPage extends Component {
    renderFields() {
        return (
            <div>
                <Field type="text" label="First name" name="firstName" component={RenderField} />
                <Field type="text" label="Last name" name="lastName" component={RenderField} />
                <Field type="text" label="Email" name="email" component={RenderField} />
            </div>
        );
    }

    render() {
        var { handleSubmit } = this.props;
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    {this.renderFields()}
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'workflowForm',
    destroyOnUnmount: false,
    validate
})(FormFirstPage);