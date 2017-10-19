import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from './RenderField';

class FormSecondPage extends Component {
    render() {
        var { previousPage, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                Second page!
                <button type="button" onClick={previousPage}>
                    Previous
                </button>
                <button type="submit">
                    Next
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'workflowForm'
})(FormSecondPage);