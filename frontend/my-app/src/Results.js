import React from 'react';
import './App.css';

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
            alert('Form submitted with values: ' + this.state.major + ', ' + this.state.gpa + ', ' + this.state.amount + '.');

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
                        <input type="text" name="major" value={this.state.value} onChange={this.handleChange} placeholder="Computer Science" required/>
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
        };
    }

    

    render () {
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
                        <Result isActive={false}title="Result Title 1" description={this.hipsterIpsum} />
                        <Result isActive={false}title="Result Title 2" description="This is a shorter description." />
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
