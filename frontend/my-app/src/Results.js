import React from 'react';
import './App.css';

import { getDataFetch } from './utils/api_functions';

function ResultsList(props)
{
    const list = props.itemsList;
    const updatedList = list.map((listItems)=>{
        return<li key={listItems.toString()}>
            {listItems.title}
            {listItems.description}
        </li>
    });
    return(
        <ul>{updatedList}</ul>
    );
}

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
        const isActive = this.props.active;

        return(
            //<div className={this.state.activeClasses[0]? "floatingBox3-active":"floatingBox3-inactive"} onClick={() => this.addActiveClass(0)}>}
            <div className={this.state.active ? "floatingBox3-active" : "floatingBox3-inactive"} onClick={this.updateClass}>
                <h2>
                    {this.props.title}
                </h2>
                <span>
                    {this.props.description}
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
            major: 'computer-science',
            gpa: 0.0,
            amount: 0
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
            if(target.value === 'NA')
            {
                value = 0;
            }
            else
            {
                value = target.value;
            }
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
        else //this should never be called, but CYA protocol dictates it stays in.
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
        else if(typeof this.state.major !== 'string' && !(this.state.major instanceof String) || !this.state.major.length)
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
                        <select name="gpa" onChange={this.handleChange}>
                            <option value="NA">None</option> {/*Default value*/}
                            <option value="2.0">2.0-2.5</option>
                            <option value="2.5">2.5-3.0</option>
                            <option value="3.0">3.0-3.5</option>
                            <option value="3.5">3.5-4.0</option>
                            <option value="4.0">4.0</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Amount
                        <input type="number" name="amount" placeholder="None" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Apply" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

{/* Forms reference: https://reactjs.org/docs/forms.html */}
class Results extends React.Component
{
    constructor(props){
        super(props);
        this.hipsterIpsum = "Lorem ipsum dolor amet godard jianbing you probably haven't heard of them, bicycle rights ennui everyday carry portland yuccie fixie cronut organic poke. Pabst williamsburg YOLO, blog austin iceland dreamcatcher you probably haven't heard of them cold-pressed tousled prism art party semiotics asymmetrical. Jean shorts glossier PBR&B heirloom. Synth pinterest farm-to-table coloring book pug tofu. Meditation vexillologist offal, hell of microdosing pug aesthetic intelligentsia knausgaard hoodie tumblr. Flannel flexitarian ethical chia taiyaki, gochujang street art fam mlkshk. Migas biodiesel selvage wolf. Authentic cold-pressed gentrify roof party letterpress +1 polaroid humblebrag keffiyeh meggings shaman. Hammock iceland green juice, art party cliche pork belly pug you probably haven't heard of them fixie hell of. Crucifix blue bottle vegan, selfies put a bird on it trust fund normcore. Blog listicle celiac, farm-to-table fixie shoreditch deep v hell of mlkshk plaid. Fashion axe drinking vinegar green juice kickstarter. 8-bit cliche you probably haven't heard of them hammock, mixtape XOXO shoreditch biodiesel selvage seitan. Fanny pack roof party etsy echo park, woke kickstarter irony asymmetrical pabst actually leggings snackwave +1 messenger bag wolf. Chartreuse fashion axe echo park single-origin coffee shaman meggings banh mi. Pop-up gastropub literally iPhone, tilde woke vinyl hoodie live-edge YOLO godard. Hexagon fashion axe yr cold-pressed offal la croix kinfolk food truck. Food truck yuccie dreamcatcher mustache, tattooed wolf edison bulb gastropub.";
        this.state = {
            listItems: this.props.listItems,
            all: this.props.all,
            response: [],
        };
        this.response = null;
        getDataFetch().then(response => {
            console.log(response[0]);
            this.response = response
        });
    }

    componentWillMount() {
        getDataFetch().then(api_response => {
            console.log(api_response)
                this.setState({
                    response: api_response
                });
        })
    }



    render () {
        let scholarships;
        if(this.state.response.length == 0) {
            scholarships = <Result isActive={false}title="Loading Data" description="This will take a few seconds..." />
        } else {
            scholarships = <Result isActive={false}title={this.state.response[0].name} description={this.state.response[0].description} />;
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
                    <input type="text" placeholder="Search scholarships..." name="search" />
                    <button type="submit">Go</button>
                </div>

                <div className="row-flex">
                    {/* FILTERS */}
                    <div className="column-30" style={{backgroundColor:"var(--ss-light-gray)", margin:"10px", textAlign:"left", borderRadius:"5px"}}>
                        <Filters />
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
