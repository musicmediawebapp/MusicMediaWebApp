import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from './RenderField';

class FormFirstPage extends Component {
    renderFields() {
        return (
            <div>
                <Field type="text" label="title" name="firstPageTitle" component={RenderField} />
            </div>
        );
    }

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">add_alert</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'workflowForm'
})(FormFirstPage);