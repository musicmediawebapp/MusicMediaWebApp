import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/ValidateWorkflow';
import FormFields from './FormFields';
import _ from 'lodash';
import { fetchUser } from '../../actions/index';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Personal extends Component {
    componentWillReceiveProps({ formValues }) {
        // The redux-form reducer will retrieve our personalForm on the second render
        if (typeof formValues.values !== "undefined") {
            formValues.values.formType = "profile";
        }
    }

    handleSubmit(event) {
        var { values } = this.props.formValues;
        event.preventDefault();
    }

    renderFields() {
        return _.map(FormFields, ({ key, type, label, name, component: { RenderField }, value }) => {
            if (type === "text") {
                return <Field  key={key} type={type} label={label} name={name} component={RenderField} />
            }
            else if (type === "radio") {
                // For Fields with type "radio", we must wrap it around a label element for it to work
                return <label><Field key={key} type={type} label={label} name={name} component={RenderField} value={value} /></label>
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {this.renderFields()}
                    <button className="teal btn-flat right white-text" type="submit">
                        Update
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
function mapStateToProps({ form: { personalForm } }) {
    return {
        formValues: personalForm
    };
}

export default connect(mapStateToProps, actions)(Personal);