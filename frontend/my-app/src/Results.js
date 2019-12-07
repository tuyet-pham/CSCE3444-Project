import React from 'react';
import './App.css';

import { fetchScholarships } from './utils/api_functions';

class Result extends React.Component
{
    constructor(props)
    {
        super(props);
        this.updateClass = this.updateClass.bind(this);
        this.state = {active: false};
    }

    render()
    {
        let gpa;
        if(this.props.gpa === null)
        {
            gpa = <span>None</span>
        }
        else
        {
            gpa = <span>{this.props.gpa}</span>
        }

        let essay;
        if(this.props.essay === null)
        {
            essay = <span>Not Required</span>
        }
        else
        {
            essay = <span>Required</span>
        }

        let citizenship;
        if(this.props.citizenship !== null && this.props.title.localeCompare("Loading Data") !== 0)
        {
            citizenship = <span><br /><br /><strong>Citizenship Required</strong></span>
        }
        else
        {
            citizenship = <span> </span>
        }

        let result;
        if(this.props.title.localeCompare("Loading Data") !== 0)
        {
            result = (
                <span>
                    <span className="column-30">
                        ${this.props.amount}
                    </span>
                    <span className="column-30">
                        GPA: {gpa}
                    </span>
                    <span className="column-30">
                        Essay: {essay}
                    </span>
                    <div style={{clear:"both"}}></div>
                </span>
            );
        }
        else
        {
            result = <span></span>
        }

        return(
            //<div className={this.state.activeClasses[0]? "floatingBox3-active":"floatingBox3-inactive"} onClick={() => this.addActiveClass(0)}>}
            <div className={this.state.active ? "floatingBox3-active" : "floatingBox3-inactive"} onClick={this.updateClass}>
                <h2>
                    {this.props.title}
                </h2>
                    {result}
                <span>
                    {this.props.description}
                </span>
                <span>
                    {citizenship}
                </span>
            </div>
        );
    }

    updateClass()
    {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    }
}

class Filters extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            major: 'computer-science', /*hyphenated no-caps string */
            gpa: 0.0, /*nonnegative floating point; accepted values can be ints or decimals, e.g. 1 or 1.0 or 1.5 */
            amount: 0, /*int; cannot be negative*/
            max_amount: null,
            sex: null, /*string; Male, Female, or Other*/
            citizenship: null, /*string (bool); required (true) or not required (false) */
            essay: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /* When an entry updates, this function catches that change.*/
    handleChange(event)
    {
        const target = event.target;
        //If the data type is the major, hyphenate the input so it can be passed to Flask.
        //If it is the GPA, make sure it is a numerical value (e.g. null = 0)
        //If it is the amount, make sure it is not null (e.g. null = 0, ' ' = 0, etc)
        let value;
        if(target.name === 'major')
        {
            value = this.hyphenate(target.value);
        }
        else if(target.name === 'gpa')
        {
            value = target.value;
        }
        else if(target.name ==='amount')
        {
            if(target.value.length === 0)
            {
                value = 0;
            }
            else
            {
                value = target.value;
            }
        }
        else if(target.name ==='max_amount')
        {
            if(target.value.length === 0)
            {
                value = null;
            }
            else
            {
                value = target.value;
            }
        }
        else if(target.name ==='essay' || target.name === "citizenship")
        {
            if(target.value.localeCompare("null") === 0)
            {
                value = null;
            }
            else
            {
                value = target.value;
            }
        }
        else
        {
            value = target.value;
        }

        const name = target.name;

        this.setState({
            [name] : value
        });
    }


    /*Prevent page from reloading and handle submitted data. Called when user clicks 'Apply.'*/
    handleSubmit(event)
    {
        event.preventDefault(); //Don't allow page to reload
        if(this.validate(event))
        {
            //alert('Form submitted with values: ' + this.state.major + ', ' + this.state.gpa + ', ' + this.state.amount + '.');
            this.props.updateQuery(this.state)

        }
    }

    hyphenate(str)
    {
        const str2 = str.replace(/\s+/g, "-").toLowerCase();
        return str2;
    }

    validate(event)
    {
        if(this.state.amount < 0)
        {
            alert("Amount not valid.");
            return false;
        }
        else if(this.state.gpa < 0.0 || this.state.gpa > 4.0)
        {
            alert("GPA not valid.");
            return false;
        }
        else if((typeof this.state.major !== 'string' && !(this.state.major instanceof String)) || !this.state.major.length)
        {
            alert("Major must be a valid string.");
            return false;
        }

        return true;
    }

    render ()
    {
        return (
            <div>
                <h2 style={{color:"var(--ss-gray)"}}>
                    Filters
                </h2>
                <form className="form-inline" id="filters">
                    <label>
                        Major*
                        {/*For the record, I'm sure there's a better way to do this, but for the time being please just scroll fast.*/}
                        <select name="major" onChange={this.handleChange} placeholder="Computer Science" required>
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
                    </label>
                    <br />
                    <label>
                        GPA
                        <input type="amount"  
                            max="4.0" 
                            style={{width:"50%"}} 
                            pattern="[0-9]*(\.[0-9]+)?" 
                            name="gpa" 
                            placeholder="0.0" 
                            value={this.state.value} 
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Amount
                        <input type="number" name="amount" placeholder="None" onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Maximum amount
                        <input type="number" name="max_amount" placeholder="None" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <p>Gender</p>
                        <label>
                            <input type="radio" name="sex" value="Female" onChange={this.handleChange}/>Women<br/>
                        </label>
                        <label>
                            <input type="radio" name="sex" value="Male" onChange={this.handleChange}/>Men<br/>
                        </label>
                        <label>
                            <input type="radio" name="sex" value="Other" onChange={this.handleChange}/>Other<br/>
                        </label>
                    <br />
                    <p>Citizenship</p>
                        <label>
                            <input type="radio" name="citizenship" value="True" onChange={this.handleChange}/>Required<br/>
                        </label>
                        <label>
                            <input type="radio" name="citizenship" value="False" onChange={this.handleChange}/>Not required<br/>
                        </label>
                        <label>
                            <input type="radio" name="citizenship" value="null" onChange={this.handleChange}/>No preference<br/>
                        </label>
                    <br />
                    <p>Essay</p>
                        <label>
                            <input type="radio" name="essay" value="True" onChange={this.handleChange}/>Required<br/>
                        </label>
                        <label>
                            <input type="radio" name="essay" value="False" onChange={this.handleChange}/>Not required<br/>
                        </label>
                        <label>
                            <input type="radio" name="essay" value="null" onChange={this.handleChange}/>No preference<br/>
                        </label>
                    <br />
                    <br />
                    <input type="submit" value="Apply" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}


/* Forms reference: https://reactjs.org/docs/forms.html */
class Results extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            listItems: this.props.listItems,
            all: this.props.all,
            response: [],
            keywords: null,
            gpa: null,/*nonnegative floating point; accepted values can be ints or decimals, e.g. 1 or 1.0 or 1.5 */
            amount: null, /*int; cannot be negative*/
            max_amount: null,
            major: 'computer-science', /*hyphenated no-caps string */
            sex: null, /*string; Male, Female, or Other*/
            citizenship: null, /*string (bool); required (true) or not required (false) */
            essay: null
            };
    }

    getNewQuery(filters) {
        let qfilters = this.state;
        if(filters.keywords)
        {
            let str = this.searchParamsToCsv(filters.keywords)
            this.setState({
                    keywords: str
            });
        }
        if(filters.gpa)
        {
            this.setState({
                    gpa: filters.gpa
            });
            qfilters.gpa = filters.gpa
        }
        else
        {
            qfilters.gpa = null
        }
        if(filters.amount)
        {
            this.setState({
                    amount: filters.amount
            });
            qfilters.amount = filters.amount
        }
        else
        {
            qfilters.amount = null
        }
        if(filters.max_amount)
        {
            this.setState({
                    max_amount: filters.max_amount
            });
            qfilters.max_amount = filters.max_amount
        }
        else
        {
            qfilters.max_amount = null
        }
        if(filters.major)
        {
            this.setState({
                    major: filters.major
            });
            qfilters.major = filters.major
        }
        if(filters.sex)
        {
            this.setState({
                    sex: filters.sex
            });
            qfilters.sex = filters.sex
        }
        else
        {
            qfilters.sex = null
        }
        if(filters.citizenship)
        {
            this.setState({
                    citizenship: filters.citizenship
            });
            qfilters.citizenship = filters.citizenship
        }
        else
        {
            qfilters.citizenship = null
        }
        if(filters.essay)
        {
            this.setState({
                    essay: filters.essay
            });
            qfilters.essay = filters.essay
        }
        else
        {
            qfilters.essay = null
        }
        fetchScholarships(qfilters).then(api_response => {
            console.log(api_response);
            this.setState({
                response: api_response
            });
        })
    }

    componentWillMount() 
    {
        fetchScholarships(this.state).then(api_response => {
            console.log(api_response);
            this.setState({
                response: api_response
            });
        })
    }

    handleSearchBarChange(event) 
    {
        const target = event.target
        let currStr
        let newStr

        currStr = target.value
        newStr = this.searchParamsToCsv(currStr)

        this.setState({
            keywords: newStr
        })
    }

    //Turn search parameters into comma-separated values, e.g. "Onua is the best bionicle" to "Onua,is,the,best,Bionicle"
    searchParamsToCsv(searchParam)
    {
        let str = searchParam.split(/[\s]+/).filter(function(v){return v!==''}).join(',')
        return (str)
    }

    handleKeywordSubmit(event)
    {
        event.preventDefault()
        this.getNewQuery(this.state)

    }

    render () {
        let scholarships;
        if(this.state.response.length === 0) {
            scholarships = <Result isActive={false} title="Loading Data" description="This will take a few seconds..." />
        } else {
            scholarships = this.state.response.map((value, index) => {
                    return (<Result key={index} isActive={false} title={value.name} gpa={value.GPA} amount={value.amount} essay={value.essay} citizenship={value.citizenship} description={value.description} />)
                })
        }

        return (
            <div className="App-search-results">
                {/*HEADER GOES HERE */}
                <div className="App-header">
                    <h1 className="App-header-contents">
                        <img className="App-logo" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/>
                        ScholarScraper
                    </h1>
                </div>

                {/* SEARCH BAR */}
                <div className="Search-bar-wide">
                    <input type="text" placeholder="Search scholarships by keyword..." name="keywords" onChange={this.handleSearchBarChange.bind(this)}/>
                    <button type="submit" onClick={this.handleKeywordSubmit.bind(this)}>Go</button>
                </div>

                <div className="row-flex">
                    {/* FILTERS */}
                    <div className="column-30" style={{backgroundColor:"var(--ss-light-gray)", margin:"10px", textAlign:"left", borderRadius:"5px"}}>
                        <Filters updateQuery={this.getNewQuery.bind(this)} />
                    </div>

                    {/* RESULTS */}
                    <div className="column-70">
                        {/* FOR result IN results */}
                        {scholarships}
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
