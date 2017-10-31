import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import './FormSecondPage.css';
import validate from '../../../utils/ValidateWorkflow';
import _ from 'lodash';
import FormFields from './FormFields';

class FormSecondPage extends Component {
    renderFields() {
        return _.map(FormFields, ({ key, type, label, name, component: { RenderField }, value }) => {
            if (type === "text") {
                return <Field  key={key} type={type} label={label} name={name} component={RenderField} />
            }
            else if (type === "radio") {
                // For Fields with type "radio", we must wrap it around a label element for it to work
                return <label key={key}><Field type={type} label={label} name={name} component={RenderField} value={value} /></label>
            }
        });
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