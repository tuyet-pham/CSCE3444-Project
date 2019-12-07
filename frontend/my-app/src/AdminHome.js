import React from 'react';
import './App.css';
import TableP from './Table';
import NavBarAdmin from './NavBarAdmin';
import { approveScholarships, deleteScholarships } from './utils/api_functions'


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
            username: '',
            email: '',
            response: null,
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

    componentWillMount() {
        this.selectedCheckboxesID = new Set();
    }

    toggleCheckbox = id => {
        if(this.selectedCheckboxesID.has(id)) {
            this.selectedCheckboxesID.delete(id)
        } else {
            this.selectedCheckboxesID.add(id)
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken

        this.setState({
            username: this.state.username,
        })

        setInterval(() => {
            this.setState({requests:this.state.requests + 1})
            this.setState({reported:this.state.reported + 1})
            this.setState({all:this.state.all + 1})

        }, 1000)
    }

    handleApprove() {
        approveScholarships(Array.from(this.selectedCheckboxesID)).then(api_response => {
            console.log(api_response);
            this.setState({
                response: api_response
            });
            if(api_response.message === "Successfully approved.") {
                alert(api_response.message);
                window.location.reload(false);
            } else {
                alert("Please try again.");
            }
        })
    }

    handleDelete() {
        deleteScholarships(Array.from(this.selectedCheckboxesID)).then(api_response => {
            console.log(api_response);
            this.setState({
                response: api_response
            });
            if(api_response.message === "Successfully Deleted.") {
                alert(api_response.message);
                window.location.reload(false);
            } else {
                alert("Please try again.");
            }
        })
    }

    render () {
        return (
            <div className="AppAdmin">
                <div class="nav">
                    <NavBarAdmin/>
                </div>
                {/* column on the right */}
                <div class="flex-view">
                    {/* <span class="AdminHomeHeader">
                        <img class="App-logo2" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/>
                        ScholarScrape Admin Portal
                    </span > */}

                    <div title="Listing awaiting approval">
                        <h1 style={{color:'#fdd835'}} class="viewdisplay">{this.state.requests}</h1>
                                Search for Scholarships
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
                    <span>
                        <span><TableP toggleCheckbox={this.toggleCheckbox} /></span>
                    </span>
                    <p>
                        <div style={{textAlign:"center", margin: "auto"}}>
                            <input type="submit" class="flatButton" onClick={this.handleApprove.bind(this)} value="Approve"/>
                            <input type="submit" class="flatButton" onClick={this.handleDelete.bind(this)} style={{background: "red"}} value="Remove"/>
                        </div>
                    </p>
                </div>
            </div>
        );
    }
}

export default AdminHome;
