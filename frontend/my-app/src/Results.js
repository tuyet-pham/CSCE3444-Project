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
            major: 'Computer Science',
            gpa: 0.0,
            amount: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(event)
    {
        event.preventDefault(); //Don't allow page to reload
        // alert('Form submitted with values: ' + this.state.major + ', ' + this.state.gpa + ', ' + this.state.amount + '.');
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
                        <input type="text" name="major" value={this.state.value} onChange={this.handleChange} placeholder="Computer Science"/>
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
