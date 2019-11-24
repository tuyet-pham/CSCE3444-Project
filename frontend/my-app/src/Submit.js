import React from 'react';
import './App.css';

/*
    useEffect(() => {
        fetch('/scholarship').then(response => 
            response.json().then(data => {
                console.log(data);
            })
        );
    },[]);

*/


class Submit extends React.Component {
    // constructor(props){
    //     super(props);

    //     var x = new Date();
    //     this.state = {
    //         date: x
    //     };
    // }
    render () {
        return (
            <div class="SubmissionBackground">
                <div class="title">Submit Scholarship Listing</div>
                <div class="submissionDiv">
                    <div>
                        <p>Required fields are followed by <strong><abbr title="required">*</abbr></strong>.</p>
                        <form>
                            <div class="row2">
                                <div class="column">
                                    <input type="text" max="300" name="name" class="admininput2" placeholder="scholarship name"/><strong><abbr title="required">*</abbr></strong>
                                    <input type="url"  max="300" name="url" class="admininput2" placeholder="scholarship url"/><strong><abbr title="required">*</abbr></strong>
                                </div>
                                <div class="column">
                                    <input type="text" style={{width:"50%"}} name="amount" class="admininput2" placeholder="amount"/>
                                    <input type="url"  max="4.0" style={{width:"50%"}} name="GPA" class="admininput2" placeholder="Minimum GPA"/><strong><abbr title="required">*</abbr></strong>
                                </div>
                                <div class="column">
                                    Ethnicity<br/>
                                    <select style={{width:"100%"}} id="ethnicity" name="ethnicity">
                                        <option value="hispanic">African American</option>
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
                                    <input type="date" style={{width:"50%"}} name="deadline" class="admininput2"/><strong><abbr title="required">*</abbr></strong>
                                </div>
                            </div> 
                            <div class="row2">
                                <div class="column">
                                    Gender <br/>
                                    <input type="radio" id="0" name="gender" value="F" /> Female <br/>
                                    <input type="radio" id="1" name="gender" value="M" /> Male <br/>
                                    <input type="radio" id="-1" name="gender" value="F" /> Varies
                                    <br/><br/>
                                    Academic Major <strong><abbr title="required">*</abbr></strong><br/>
                                    <select style={{width:"100%"}} id="major" name="Major">
                                        <option value="academic">Academics</option>
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
                                    <input type="radio" id="0" name="citizenship" value="0" /> Y <br/>
                                    <input type="radio" id="1" name="citizenship" value="1" /> N 
                                    <br/><br/>
                                    Is there an essay involved? <br/>
                                    <input type="radio" id="0" name="citizenship" value="0" /> Y <br/>
                                    <input type="radio" id="1" name="citizenship" value="1" /> N
                                </div>
                            </div> 
                            <div class="row2">
                                <div style={{textAlign:"left"}} class="columnBottom">
                                    <textarea placeholder="Add a description of the scholarship..." max="2000" name="description" rows="100" cols="30"/>
                                </div>
                            </div>
                            <div class="row2">
                                <div  class="columnBottom">
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
