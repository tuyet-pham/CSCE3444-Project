import React from 'react';
import './App.css';
import Recaptcha from "react-recaptcha"
import { submitScholarship } from './utils/api_functions'



class Submit extends React.Component {
    constructor(){
        super();
        //The state of the user's submission.
        this.state = {
            isVerified: false,
            name: null,
            url: null,
            amount: null,
            GPA: null,
            deadline: null,
            ethnicity: null,
            sex: null,
            citizenship: null,
            essay: null,
            major: null,
            description: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyHuman = this.verifyHuman.bind(this);
            // submitScholarship({name: 'test', url:'test', description:'test', amount: 123}).then(api_response => {
            //     console.log(api_response);
            // })
    }

    //Make sue the Recaptcha loaded correctly
    recaptchaLoaded() {
        console.log("Recaptcha Sucessfully loaded!");
    }

    //Get the reponse of the Recaptcha and change the value
    verifyHuman(response) {
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }

    //Handles the state change of values when submit clicked.
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    //Handles the submission button when clicked. Validating the values. 
    handleSubmit = (e) => {
        e.preventDefault();
        const errormsg = "Please verify that you are a human";
        const goodmsg = "Thank you for contributing.\nWe will review your submission shortly!";
        const db_errormsg = "Uh no! Looks like something went wrong. Give it another go."

        if(this.state.isVerified === false)
        {
            alert(errormsg);
        }
        else
        {
            submitScholarship(this.state)
            .then(api_response => {
                alert(goodmsg);
                console.log(api_response);
                window.location.reload(false)
            })
            .catch(api_response => {
                alert(db_errormsg);
                console.log(api_response);
            })
        }
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
                                    <input type="text" style={{width:"50%"}} pattern="[0-9]*" name="amount" class="admininput2" placeholder="amount" value={this.state.value} onChange={this.handleChange} required/>
                                    <input type="amount"  max="4.0" style={{width:"50%"}} pattern="[0-4]\.[0-9]?[0-9]" name="GPA" class="admininput2" placeholder="Minimum GPA" value={this.state.value} onChange={this.handleChange} required/>
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
                                        <option value="Other">Other</option>
                                        <option value="">NA</option>
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
                                    <select style={{width:"100%"}} name="major" value={this.state.value} onChange={this.handleChange} required>
                                        <option value="">NA</option>

                                        <option value="Computer Science">Computer Science</option>

                                        <option value="Accounting">Accounting</option>

                                        <option value="Actuarial Science">Actuarial Science</option>

                                        <option value="Advertising and Public Relations">Advertising and Public Relations</option>

                                        <option value="Aerospace Technologies and Engineering">Aerospace Technologies and Engineering</option>

                                        <option value="Agriculture Agribusiness">Agriculture Agribusiness</option>

                                        <option value="Agronomy and Soils">Agronomy and Soils</option>

                                        <option value="Airline Flight Attendant">Airline Flight Attendant</option>

                                        <option value="Animal Science">Animal Science</option>

                                        <option value="Anthropology">Anthropology</option>

                                        <option value="Applied Science and Technology">Applied Science and Technology</option>

                                        <option value="Archaeology">Archaeology</option>

                                        <option value="Architecture">Architecture</option>

                                        <option value="Art">Art</option>

                                        <option value="Art History">Art History</option>

                                        <option value="Asian Studies">Asian Studies</option>

                                        <option value="Astrophysics">Astrophysics</option>

                                        <option value="Atmospheric and Oceanic Sciences">Atmospheric and Oceanic Sciences</option>

                                        <option value="Audiology">Audiology</option>

                                        <option value="Automotive">Automotive</option>

                                        <option value="Aviation">Aviation</option>

                                        <option value="Biochemistry">Biochemistry</option>

                                        <option value="Biology">Biology</option>

                                        <option value="Botany">Botany</option>

                                        <option value="Broadcasting Visual and Interactive Media">Broadcasting Visual and Interactive Media</option>

                                        <option value="Business">Business</option>

                                        <option value="Business Administration">Business Administration</option>

                                        <option value="Business Management">Business Management</option>

                                        <option value="Carpentry">Carpentry</option>

                                        <option value="Cartography and Geographic Information Systems">Cartography and Geographic Information Systems</option>

                                        <option value="Chemical Engineering">Chemical Engineering</option>

                                        <option value="Chemistry">Chemistry</option>

                                        <option value="Child and Adolescent Development">Child and Adolescent Development</option>

                                        <option value="Chiropractic">Chiropractic</option>

                                        <option value="Civil Engineering">Civil Engineering</option>

                                        <option value="Communication Networks and Security">Communication Networks and Security</option>

                                        <option value="Communications">Communications</option>

                                        <option value="Comparative Literature">Comparative Literature</option>

                                        <option value="Computer Aided Drafting and Design">Computer Aided Drafting and Design</option>

                                        <option value="Computer Engineering">Computer Engineering</option>

                                        <option value="Computer Science">Computer Science</option>

                                        <option value="Construction Management">Construction Management</option>

                                        <option value="Cosmetology">Cosmetology</option>

                                        <option value="Creative Writing">Creative Writing</option>

                                        <option value="Criminal Justice">Criminal Justice</option>

                                        <option value="Culinary Science">Culinary Science</option>

                                        <option value="Cybersecurity">Cybersecurity</option>

                                        <option value="Dance">Dance</option>

                                        <option value="Dental Hygiene">Dental Hygiene</option>

                                        <option value="Dentistry">Dentistry</option>

                                        <option value="Design">Design</option>

                                        <option value="Earth Sciences and Natural Resources">Earth Sciences and Natural Resources</option>

                                        <option value="Ecology and Evolutionary Biology">Ecology and Evolutionary Biology</option>

                                        <option value="Economics">Economics</option>

                                        <option value="Education">Education</option>

                                        <option value="Electrical Engineering">Electrical Engineering</option>

                                        <option value="Electronics">Electronics</option>

                                        <option value="Emergency Health Services Management">Emergency Health Services Management</option>

                                        <option value="Engineering">Engineering</option>

                                        <option value="English">English</option>

                                        <option value="Entomology">Entomology</option>

                                        <option value="Entrepreneurship">Entrepreneurship</option>

                                        <option value="Environmental Engineering">Environmental Engineering</option>

                                        <option value="Environmental Studies">Environmental Studies</option>

                                        <option value="Equine Studies">Equine Studies</option>

                                        <option value="Family and Consumer Sciences">Family and Consumer Sciences</option>

                                        <option value="Fashion and Retail Studies">Fashion and Retail Studies</option>

                                        <option value="Film Studies">Film Studies</option>

                                        <option value="Film Television and Interactive Media">Film Television and Interactive Media</option>

                                        <option value="Finance">Finance</option>

                                        <option value="Fine Arts">Fine Arts</option>

                                        <option value="Fire Protection Engineering">Fire Protection Engineering</option>

                                        <option value="Firefighting">Firefighting</option>

                                        <option value="Food Science and Human Nutrition">Food Science and Human Nutrition</option>

                                        <option value="Foreign Languages Cultures">Foreign Languages Cultures</option>

                                        <option value="Forensic Science">Forensic Science</option>

                                        <option value="Forestry Fisheries and Wildlife">Forestry Fisheries and Wildlife</option>

                                        <option value="Funeral Services Mortuary">Funeral Services Mortuary</option>

                                        <option value="Game Design">Game Design</option>

                                        <option value="Genetics Genomics and Development">Genetics Genomics and Development</option>

                                        <option value="Geography Area Studies">Geography Area Studies</option>

                                        <option value="Geology and Geophysics">Geology and Geophysics</option>

                                        <option value="Government">Government</option>

                                        <option value="Graphic Design">Graphic Design</option>

                                        <option value="Health Care Administration">Health Care Administration</option>

                                        <option value="Health Education and Promotion">Health Education and Promotion</option>

                                        <option value="History">History</option>

                                        <option value="Horticulture">Horticulture</option>

                                        <option value="Hotel and Restaurant Management">Hotel and Restaurant Management</option>

                                        <option value="Human Resources">Human Resources</option>

                                        <option value="Human Services">Human Services</option>

                                        <option value="Humanities">Humanities</option>

                                        <option value="Hvac">Hvac</option>

                                        <option value="Information Systems">Information Systems</option>

                                        <option value="Insurance">Insurance</option>

                                        <option value="Interior Design">Interior Design</option>

                                        <option value="International Affairs">International Affairs</option>

                                        <option value="International Business">International Business</option>

                                        <option value="Jewish Studies Judaism">Jewish Studies Judaism</option>

                                        <option value="Journalism and Public Relations">Journalism and Public Relations</option>

                                        <option value="Labor Studies">Labor Studies</option>

                                        <option value="Landscape Architecture">Landscape Architecture</option>

                                        <option value="Law School Legal Studies">Law School Legal Studies</option>

                                        <option value="Liberal Arts">Liberal Arts</option>

                                        <option value="Library Sciences">Library Sciences</option>

                                        <option value="Lighting Design">Lighting Design</option>

                                        <option value="Linguistics">Linguistics</option>

                                        <option value="Logistics Supply Chain Management">Logistics Supply Chain Management</option>

                                        <option value="Marine Science">Marine Science</option>

                                        <option value="Marketing">Marketing</option>

                                        <option value="Materials Science">Materials Science</option>

                                        <option value="Mathematics">Mathematics</option>

                                        <option value="Mechanical Engineering">Mechanical Engineering</option>

                                        <option value="Medical Technology">Medical Technology</option>

                                        <option value="Medicine">Medicine</option>

                                        <option value="Microbiology">Microbiology</option>

                                        <option value="Molecular and Cell Biology">Molecular and Cell Biology</option>

                                        <option value="Museum Studies">Museum Studies</option>

                                        <option value="Music">Music</option>

                                        <option value="Native American Studies">Native American Studies</option>

                                        <option value="Neuroscience and Behavioral Biology">Neuroscience and Behavioral Biology</option>

                                        <option value="New Media">New Media</option>

                                        <option value="Nuclear Science and Engineering">Nuclear Science and Engineering</option>

                                        <option value="Nursing Nurse Practitioner">Nursing Nurse Practitioner</option>

                                        <option value="Nutrition">Nutrition</option>

                                        <option value="Occupational Therapy">Occupational Therapy</option>

                                        <option value="Oncology">Oncology</option>

                                        <option value="Optometry Ophthalmology">Optometry Ophthalmology</option>

                                        <option value="Orthotics Prosthetics">Orthotics Prosthetics</option>

                                        <option value="Osteopathic">Osteopathic</option>

                                        <option value="Paralegal">Paralegal</option>

                                        <option value="Park and Recreation Management">Park and Recreation Management</option>

                                        <option value="Pediatrics">Pediatrics</option>

                                        <option value="Pharmaceutical Sciences">Pharmaceutical Sciences</option>

                                        <option value="Philosophy">Philosophy</option>

                                        <option value="Photography">Photography</option>

                                        <option value="Physical Education Sport and Physical Activity">Physical Education Sport and Physical Activity</option>

                                        <option value="Physical Therapy Rehabilitation">Physical Therapy Rehabilitation</option>

                                        <option value="Physician Associate">Physician Associate</option>

                                        <option value="Physics">Physics</option>

                                        <option value="Physiology and Neurobiology">Physiology and Neurobiology</option>

                                        <option value="Plumbing">Plumbing</option>

                                        <option value="Police Law Enforcement">Police Law Enforcement</option>

                                        <option value="Political Science">Political Science</option>

                                        <option value="Polymer and Fiber Engineering">Polymer and Fiber Engineering</option>

                                        <option value="Psychiatry">Psychiatry</option>

                                        <option value="Psychology Counseling">Psychology Counseling</option>

                                        <option value="Public Health">Public Health</option>

                                        <option value="Public Policy">Public Policy</option>

                                        <option value="Radiologic Sciences">Radiologic Sciences</option>

                                        <option value="Real Estate">Real Estate</option>

                                        <option value="Religious Studies">Religious Studies</option>

                                        <option value="Science General">Science General</option>

                                        <option value="Science Health">Science Health</option>

                                        <option value="Science Social">Science Social</option>

                                        <option value="Social Work">Social Work</option>

                                        <option value="Sociology">Sociology</option>

                                        <option value="Spanish">Spanish</option>

                                        <option value="Special Education">Special Education</option>

                                        <option value="Speech Language and Hearing Sciences">Speech Language and Hearing Sciences</option>

                                        <option value="Sport Management">Sport Management</option>

                                        <option value="Sports Medicine">Sports Medicine</option>

                                        <option value="Theater and Performance Studies">Theater and Performance Studies</option>

                                        <option value="Theology">Theology</option>

                                        <option value="Tourism Management">Tourism Management</option>

                                        <option value="Transportation Technologies">Transportation Technologies</option>

                                        <option value="Veterinary Medicine">Veterinary Medicine</option>

                                        <option value="Viticulture and Enology">Viticulture and Enology</option>

                                        <option value="Vocational Careers">Vocational Careers</option>

                                        <option value="Web Design">Web Design</option>

                                        <option value="Welding">Welding</option>

                                        <option value="Womens and Gender Studies">Womens and Gender Studies</option>

                                        <option value="Zoology">Zoology</option>
                                    </select>
                                </div>
                                <div class="column">
                                    Requires citizenship? 
                                    <input type="radio" name="citizenship" value="1" onChange={this.handleChange}/> Y <br/>
                                    <input type="radio" name="citizenship" value="0" onChange={this.handleChange}/> N 
                                    <br/><br/>
                                    Is there an essay involved? <br/>
                                    <input type="radio" name="essay" value="1" onChange={this.handleChange}/> Y <br/>
                                    <input type="radio" name="essay" value="0" onChange={this.handleChange}/> N
                                </div>
                            </div> 
                            <div class="row3">
                                <div style={{marginLeft:"10px"}} class="columnBottom">
                                    Add a description of the scholarship.. <strong><abbr title="required">*</abbr></strong>
                                    <textarea placeholder="." max="1000" name="description" rows="100" cols="30" value={this.state.value} onChange={this.handleChange} required/>
                                </div>
                                <div style={{textAlign:"right"}} class="columnBottom">
                                    <input type="submit" class="flatButton" value="Submit Listing"/>
                                </div>
                            </div>
                        </form>
                        <div class="recaptchaSubmit">
                            {/* The Recaptcha  */}
                            <Recaptcha
                                sitekey="6Lc99cUUAAAAAHuqgpFUsTsBUhAmZna0wIkZAd-r"
                                render="explicit"
                                verifyCallback={this.verifyHuman}
                                onloadCallback={this.recaptchaLoaded}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Submit;
