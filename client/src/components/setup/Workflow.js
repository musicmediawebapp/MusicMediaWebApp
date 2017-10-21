import React, { Component } from 'react';
import FormFirstPage from './FormFirstPage/FormFirstPage';
import FormSecondPage from './FormSecondPage/FormSecondPage';
import FormThirdPage from './FormThirdPage';
import { connect } from 'react-redux';

class Workflow extends Component {
    constructor(props) {
        super(props)

        this.nextPage = this.nextPage.bind(this); // Purpose is to make a function called with "this" keyword
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
        var { auth } = this.props;
        return(
            <div>
                {page === 1 && <FormFirstPage onSubmit={this.nextPage} />}
                {page === 2 && <FormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} />}
                {page === 3 && <FormThirdPage previousPage={this.previousPage} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Workflow);


