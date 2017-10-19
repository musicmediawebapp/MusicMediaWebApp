import React, { Component } from 'react';

class FormThirdPage extends Component {
    render() {
        var { previousPage, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                I'm ready to start!
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

export default FormThirdPage;