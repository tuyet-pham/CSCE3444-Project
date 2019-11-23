import React from 'react';
import './App.css';


class Submit extends React.Component {
    constructor(props){
        super(props);

        var x = new Date();
        this.state = {
            date: x
        };
    }
    render () {
        return (
            <div class="SubmissionBackground">
                <div class="submissionDiv">
                    <div>
                        <div class="row">
                            <div class="column">
                                <input type="text" class="admininput2" placeholder="scholarship name"/>
                                <input type="text" class="admininput2" placeholder="scholarship url"/>
                            </div>
                            <div class="column">
                                <input type="text" class="admininput2" placeholder="amount"/>
                                <input type="date" class="admininput2" placeholder="deadline"/>
                            </div>
                            <div class="column"></div>
                        </div> 
                        <div class="row">
                            <div class="column"></div>
                            <div class="column"></div>
                        </div> 
                        <div class="row">
                            <div class="columnBottom">
                                <div class="title">Submit Scholarship Listing</div>
                            </div>
                            <div class="columnBottom"></div>
                        </div> 
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Submit;
