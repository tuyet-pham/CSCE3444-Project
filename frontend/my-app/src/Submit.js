import React from 'react';
import './App.css';



class Submit extends React.Component {
    constructor(){
        super();
        var x = new Date();
        console.log(x);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            url: "",
            amount: 0,
            GPA: 0.0,
            date: x.get,
            deadline: "",
            ethnicity: "",
            sex: -1,
            citizenship: -1,
            essay: -1,
            major: "",
            description: "",
            accp_status: -1
        };
    }

    handleSubmit = (e) => {
        const errormsg = "Your input is invalid, try again";
        const goodmsg = "";
        
        if(!this.validate(e))
        {
            alert(errormsg);
        }
        else {
            alert(goodmsg);
        }

        //post : search & submit
        //get
        //put
        //delete
    }

    validate( ) {
        //if value is good then return good alert, if not then alert bad. 
    }

    render () {
        return (
            <div class="SubmissionBackground">
                <div class="title">Submit Scholarship Listing</div>
                <div class="submissionDiv">
                    <div>
                        <p>Required fields are followed by <strong><abbr title="required">*</abbr></strong>.</p>
                        <form onSubmit={this.handleSubmit}>
                            <div class="row2">
                                <div class="column">
                                    <input type="text" max="300" name="name" class="admininput2" placeholder="scholarship name" required/><strong><abbr title="required">*</abbr></strong>
                                    <input type="url"  max="300" name="url" class="admininput2" placeholder="scholarship url" required/><strong><abbr title="required">*</abbr></strong>
                                </div>
                                <div class="column">
                                    <input type="text" style={{width:"50%"}} name="amount" class="admininput2" placeholder="amount"/>
                                    <input type="amount"  max="4.0" style={{width:"50%"}} name="GPA" class="admininput2" placeholder="Minimum GPA" required/><strong><abbr title="required">*</abbr></strong>
                                </div>
                                <div class="column">
                                    Ethnicity<br/>
                                    <select style={{width:"100%"}} id="ethnicity" name="ethnicity">
                                        <option value="hispanic">Black</option>
                                        <option value="hispanic">Asian</option>
                                        <option value="hispanic">Hispanic</option>
                                        <option value="hispanic">Native American</option>
                                        <option value="hispanic">Caucasian</option>
                                        <option value="hispanic">Pacific Islander</option>
                                        <option value="hispanic">Other</option>
                                    </select>
                                </div>
                                <div class="column">
                                    Deadline <br/>
                                    <input type="date" style={{width:"50%"}} name="deadline" class="admininput2" required/><strong><abbr title="required">*</abbr></strong>
                                </div>
                            </div> 
                            <div class="row2">
                                <div class="column">
                                    Gender <br/>
                                    <input type="radio" id="0" name="gender" value="F" /> Female <br/>
                                    <input type="radio" id="1" name="gender" value="M" /> Male <br/>
                                    <input type="radio" id="-1" name="gender" value="F" /> Varies
                                    <br/><br/><br/><br/>
                                    Academic Major <strong><abbr title="required">*</abbr></strong><br/>
                                    <select style={{width:"100%"}} id="major" name="Major">
                                        <option value="academic" required>Academics</option>
                                        <option value="aerospace">Aerospace</option>
                                        <option value="agriculture">Agriculture</option>
                                        <option value="advertising">Advertising and Publication</option>
                                        <option value="art">Art</option>
                                        <option value="business">Business</option>
                                        <option value="computer science">Computer Science</option>
                                        <option value="it">IT</option>
                                    </select>
                                </div>
                                <div class="column">
                                    Requires citizenship? <strong><abbr title="required">*</abbr></strong><br/> 
                                    <input type="radio" id="0" name="citizenship" value="0" required/> Y <br/>
                                    <input type="radio" id="1" name="citizenship" value="1" /> N 
                                    <br/><br/>
                                    Is there an essay involved? <br/>
                                    <input type="radio" id="0" name="essay" value="0" /> Y <br/>
                                    <input type="radio" id="1" name="essay" value="1" /> N
                                </div>
                            </div> 
                            <div class="row2">
                                <div style={{textAlign:"left"}} class="columnBottom">
                                    <textarea placeholder="Add a description of the scholarship..." max="2000" name="description" rows="100" cols="30"/>
                                </div>
                                <div  style={{width:"30%", padding:"160px 0px 0px 0px"}} class="columnBottom">
                                    <input type="submit" class="flatButton" value="Submit Listing"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Submit;
