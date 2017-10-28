import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/ValidateWorkflow';
import formFields from './FormFields';
import _ from 'lodash';
import { fetchUser } from '../../actions/index';
import { connect } from 'react-redux';

class Personal extends Component {
    componentWillReceiveProps({ formValues}) {
        if (formValues.values !== undefined) {
            console.log(formValues);
        }
    }

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
        return (
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

Personal = reduxForm({
    form: 'personalForm',
    validate
})(Personal);

Personal = connect(
    state => ({
        initialValues: state.auth // pull initial values from auth reducer
    }),
    {load: fetchUser} // bind loading action creator
)(Personal);


// We use the "connect" library to reach this redux-form reducer
function mapStateToProps({ form: personalForm }) {
    return {
        formValues: personalForm
    };
}

export default connect(mapStateToProps)(Personal);