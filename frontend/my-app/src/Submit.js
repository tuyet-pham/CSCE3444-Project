import React from 'react';
import './App.css';



class Submit extends React.Component {
    constructor(){
        super();
        var x = new Date();
        console.log(x);
        this.state = {
            name: "",
            url: "",
            amount: 0,
            GPA: 0.0,
            date: x.get,
            deadline: "",
            ethnicity: "",
            sex: "",
            citizenship: "",
            essay: "",
            major: "",
            description: "",
            accp_status: -1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleSubmit = (e) => {
        const goodmsg = "Thank you for your submission!";
        
        e.preventDefault(); //Don't allow page to reload
        if(this.validate(e))
        {
            alert(goodmsg);
        }

        //post : search & submit
        //get
        //put
        //delete
    }

    validate(e) {
        if(this.state.amount === parseInt(this.state.amount, 10) || this.state.amount <= 0)
        {
            alert("Amount not valid.");
            return false;
        }
        else if(this.state.GPA === parseInt(this.state.GPA, 10) || this.state.GPA <= 0.0 || this.state.GPA > 4.0)
        {
            alert("GPA not valid.");
            return false;
        }
       
        return true;
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
                                    <input type="text" max="300" name="name" class="admininput2" placeholder="scholarship name" value={this.state.value} onChange={this.handleChange} required/><strong><abbr title="required">*</abbr></strong>
                                    <input type="url"  max="300" name="url" class="admininput2" placeholder="scholarship url" value={this.state.value} onChange={this.handleChange} required/><strong><abbr title="required">*</abbr></strong>
                                </div>
                                <div class="column">
                                    <input type="text" style={{width:"50%"}} name="amount" class="admininput2" placeholder="amount" value={this.state.value} onChange={this.handleChange}/>
                                    <input type="amount"  max="4.0" style={{width:"50%"}} name="GPA" class="admininput2" placeholder="Minimum GPA" value={this.state.value} onChange={this.handleChange} required/><strong><abbr title="required">*</abbr></strong>
                                </div>
                                <div class="column">
                                    Ethnicity<br/>
                                    <select style={{width:"100%"}} id="ethnicity" name="ethnicity" value={this.state.value} onChange={this.handleChange}>
                                        <option value="Black">Black</option>
                                        <option value="Asian">Asian</option>
                                        <option value="Hispanic">Hispanic</option>
                                        <option value="Native American">Native American</option>
                                        <option value="Caucasian">Caucasian</option>
                                        <option value="Pacific Islander">Pacific Islander</option>
                                        <option value="">Other</option>
                                    </select>
                                </div>
                                <div class="column">
                                    Deadline <br/>
                                    <input type="date" style={{width:"50%"}} name="deadline" class="admininput2" value={this.state.value} onChange={this.handleChange} required/><strong><abbr title="required">*</abbr></strong>
                                </div>
                            </div> 
                            <div class="row2">
                                <div class="column">
                                    Gender <br/>
                                    <input type="radio" name="sex" value="1" onChange={this.handleChange}/> Female <br/>
                                    <input type="radio" name="sex" value="2" onChange={this.handleChange}/> Male <br/>
                                    <input type="radio" name="sex" value="-1" onChange={this.handleChange}/> Varies
                                    <br/><br/><br/><br/>
                                    Academic Major <strong><abbr title="required">*</abbr></strong><br/>
                                    <select style={{width:"100%"}} name="major" value={this.state.value} onChange={this.handleChange}>
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
                                    <input type="radio" name="citizenship" value="1" onChange={this.handleChange} required/> Y <br/>
                                    <input type="radio" name="citizenship" value="0" onChange={this.handleChange}/> N 
                                    <br/><br/>
                                    Is there an essay involved? <br/>
                                    <input type="radio" name="essay" value="1" onChange={this.handleChange}/> Y <br/>
                                    <input type="radio" name="essay" value="0" onChange={this.handleChange}/> N
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
