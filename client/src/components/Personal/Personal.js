import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from '../utils/ValidateWorkflow';
import FormFields from './FormFields';
import _ from 'lodash';
import { fetchUser } from '../../actions/index';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Personal extends Component {
    componentWillReceiveProps({ formValues }) {
        // The redux-form reducer will retrieve our personalForm on the second render
        if (typeof formValues.values !== "undefined") {
            formValues.values.formType = "profile";
        }
    }

    /* Submits the profile form in the database and return a toast upon success */
    async handleSubmit(event) {
        var { formValues, history, submitWorkflow } = this.props;
        event.preventDefault();

        var successfullySubmission = await submitWorkflow(formValues.values, history);
        if (successfullySubmission) {
            toast("You have updated your profile!");
        }
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

    renderToasts() {
        return (
            <ToastContainer 
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            />
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {this.renderFields()}
                    <Link to={'/dashboard'} className="teal btn-flat left white-text">
                        Back
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Update
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                {this.renderToasts()}      
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

export default connect(mapStateToProps, actions)(withRouter(Personal));