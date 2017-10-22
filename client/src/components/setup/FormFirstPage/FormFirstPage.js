import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from '../../utils/ValidateWorkflow';
import formFields from './FormFields';
import _ from 'lodash';
import { fetchUser } from '../../../actions/index';
import { connect } from 'react-redux';

class FormFirstPage extends Component {
    renderFields() {
        return _.map(formFields, ({ key, type, label, name, component }) => {
            return (
                <Field 
                    key={key}
                    type={type}
                    label={label}
                    name={name}
                    component={component.RenderField}
                />
            );
        });
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

FormFirstPage = reduxForm({
    form: 'workflowForm', // redux-form stores a reducer for "form", and all of our different forms are specified by this string
    destroyOnUnmount: false,
    validate
})(FormFirstPage);

FormFirstPage = connect(
    state => ({
        initialValues: state.auth // pull initial values from auth reducer
    }),
    {load: fetchUser} // bind loading action creator
)(FormFirstPage);

export default FormFirstPage;