import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from '../../utils/ValidateWorkflow'
import FormFields from './FormFields';
import _ from 'lodash';
import { fetchUser } from '../../actions/index';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import updateProfileToast from '../../utils/Toasts/default';
import s from './Personal.css';

class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originalForm: null, // Null at initial state. We wait for redux-form to give us the second value
            firstRender: true
        }
    }

    componentDidMount() {
        this.props.showHeader();
    }

    componentWillReceiveProps({ formValues }) {
        var { firstRender } = this.state;

        // The redux-form reducer will retrieve our personalForm on the second render
        if (typeof formValues.values !== "undefined") {
            formValues.values.formType = "profile";

            // After the originalForm has been set the first time, we do not want to update it every time
            // the user updates the redux-form form. The purpose is to compare the original and the proposed forms on submission.
            // If there are no changes, do not call the backend endpoint to update the user model
            if (firstRender) {
                this.setState({ originalForm: formValues.values });
                this.setState({ firstRender: false });
            }
        }
    }

    /* Submits the profile form in the database and return a toast upon success */
    async submitForm(event) {
        // Set up
        var { formValues, history, submitWorkflow } = this.props;
        event.preventDefault();

        // Check if we even have to do an update (aka did the user even make any changes?)
        var madeNoChanges = this.compareForms(this.state.originalForm, this.props.formValues.values);
        if (madeNoChanges) {
            toast("You made no changes yet!");
            return;
        }

        var successfullySubmission = await submitWorkflow(formValues.values, history);
        if (successfullySubmission) {
            toast("You have updated your profile!");
        }
    }

    compareForms(originalForm, newForm) {
        return JSON.stringify(originalForm) === JSON.stringify(newForm);
    }

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
        return (
            <div className={s.form}>
                <form onSubmit={this.submitForm.bind(this)}>
                    {this.renderFields()}
                    <Link to={'/dashboard'} className="teal btn-flat left white-text">
                        Back
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Update
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                {updateProfileToast}      
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