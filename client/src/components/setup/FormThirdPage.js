import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class FormThirdPage extends Component {
    render() {
        var { previousPage } = this.props;
        return (
            <div>
                I'm ready to start!
                <button type="button" onClick={previousPage}>
                    Previous
                </button>
                <button onClick={() => console.log(this.props.formValues)}>
                Next
            </button>
            </div>
        );
    }
}

// We use the "connect" library to reach this redux-form reducer
function mapStateToProps({ form: { workflowForm } }) {
    return {
        formValues: workflowForm.values
    };
}

/* mapStateToProps (access to reducers), actions (returned actions) */
export default connect(mapStateToProps, actions)(FormThirdPage);