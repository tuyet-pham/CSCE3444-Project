import React from 'react';
import './App.css';
import { FaBeer } from 'react-icons/fa';
import './Table';



// reference : https://www.w3schools.com/react/showreact.asp?filename=demo2_react_lifecycle_componentwillunmount
// https://www.w3schools.com/react/react_lifecycle.asp
// https://www.w3schools.com/react/react_events.asp
class AdminHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            requests : this.props.requested,
            reported: this.props.reported,
            all: this.props.all,
        };
    }

    shouldComponentUpdate() {
        return false;
    }

    requestscrape() {
        var x = document.getElementById("myDate").value;
        alert('Scraper is scheduled to scrape on ' + x);
        // Realistically the Admin should ask the db to scrape when needed. This 
        // Function will be an after thought if we have time.
    }


    componentDidMount(){
        setInterval(() => {
            this.setState({requests:this.state.requests + 1})
            this.setState({reported:this.state.reported + 1})
            this.setState({all:this.state.all + 1})
        }, 1000)
    }

    render () {
        return (
            <div className="AppAdmin"> 
                <div class="AddminHomeHeader">
                    <img class="App-logo2" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/> 
                    ScholarScrape Admin Portal
                </div>
                <div class="nav">
                    
                    <h3 style={{color:"#e0e0e0"}}>
                        Greetings {this.props.user} <br/>
                        id : {this.props.id}
                    </h3>
                    
                    <a href="Home.page" title="Go to home" target="_self">Home</a>
                    <a href="viewall.page" title="View and edit listings" target="_self">Scholarship View</a>
                    <a href="Logout" title="You leaving? :(" target="_self">Logout</a>
                </div>
                {/* column on the right */}
                <div class="flex-view">

                    <div title="Listing awaiting approval">
                        <h1 style={{color:'#fdd835'}} class="viewdisplay">{this.state.requests}</h1>
                                Search for Scholarships <FaBeer />
                                Requested listing 
                        <div>
                            <button class="button button-green">Show me</button>
                        </div>
                    </div>

                    <div title="Listing reported">
                        <h1 style={{color:'#e53935'}} class="viewdisplay">{this.state.reported}</h1>
                        Reported Listing
                        <div>
                            <button class="button button-green">Show me</button>
                        </div>
                    </div>

                    <div title="Total listing count">
                        <h1 style={{color:'#80cbc4'}} class="viewdisplay">{this.state.all}</h1>
                        Total listing
                        <div>
                            <button class="button button-green">Show me</button>
                        </div>
                    </div>


                    {/* This is disabled until we can somehow schedule the scraper */}
                    <div style={{display:"none"}} >
                        <br />
                        Last known scrape
                        <br/>{this.props.lastscraped}
                        <br /><br />
                        <form onSubmit={this.requestscrape}>
                            Request scrape: <br/>
                            <input type="date" id="myDate"></input><br/>
                            <button class="button button-red" onClick="requestscrape()">Submit Request</button>
                        </form>
                    </div>      
                </div>
            </div>
        );
    }
}

export default AdminHome;
