import React, { Component } from 'react';
import FormFirstPage from '../FormFirstPage/FormFirstPage';
import FormSecondPage from '../FormSecondPage/FormSecondPage';
import FormThirdPage from '../FormThirdPage';
import TopBar from '../TopBar/TopBar';
import './Workflow.css';

class Workflow extends Component {
    constructor(props) {
        super(props)

        this.nextPage = this.nextPage.bind(this); // Purpose is to make a function called with "this" keyword
        this.previousPage = this.previousPage.bind(this);
        
        this.state = {
            page: 1
        }
    }

    componentDidMount() {
        this.props.showHeader();
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
                {/* Show the top part of the workflow, which shows the logo */}
                <TopBar />
                <div className="form">
                    {page === 1 && <FormFirstPage onSubmit={this.nextPage} />}
                    {page === 2 && <FormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} />}
                    {page === 3 && <FormThirdPage previousPage={this.previousPage} />}
                </div>
            </div>
        );
    }
}

export default Workflow;


