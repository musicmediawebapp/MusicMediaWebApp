import React, { Component } from 'react';
import FormFirstPage from './FormFirstPage';
import FormSecondPage from './FormSecondPage';
import FormThirdPage from './FormThirdPage';

class Workflow extends Component {
    constructor(props) {
        super(props)

        this.nextPage = this.nextPage.bind(this); // Bind this method to a variable so it's bound to Javascript context
        this.previousPage = this.previousPage.bind(this);
        
        this.state = {
            page: 1
        }
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        var { page } = this.state;
        return(
            <div>
                {page === 1 && <FormFirstPage />}
                {page === 2 && <FormSecondPage />}
                {page === 3 && <FormThirdPage />}
            </div>
        );
    }
}

export default Workflow;


