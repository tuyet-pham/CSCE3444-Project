// packages import goes here
import React from 'react';
import './App.css';
import {
    Link
} from "react-router-dom";

// Icon import goes here
import {AiFillHome} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md";
import {FaUserCircle} from "react-icons/fa";
import {FaUserShield} from "react-icons/fa";
import {IoMdLogOut} from "react-icons/io";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bgColor: "#07bd65",
          disableTopNav: ""
        }
    }

    navClick (e) {
        if(e === 0){
            this.setState({
            bgColor: "rgb(133, 255, 164, .5)"
            })
        }
        else if (e === 1){
            this.setState({
                bgColor: "#07bd65"
            })
        }
        else if (e === 2){
            this.setState({
                bgColor: "whitesmoke"
            })
        }
        else if(e === 3){
            this.setState({
                bgColor: "#06904d"
            })
        }
    }

    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        const loginRegLink = (
            <div style={{backgroundColor: this.state.bgColor, display:this.state.disableTopNav}} class="nav2">
                <Link onClick={this.navClick.bind(this,1)} title="Home" to ="/"><AiFillHome/></Link>
                <Link onClick={this.navClick.bind(this,1)} title="Search for scholarships" to ="/results"><FaSearch/></Link>
                <Link onClick={this.navClick.bind(this,0)} title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                <Link onClick={this.navClick.bind(this,2)} title="Admin Login" to ="/adminlogin"><FaUserCircle/></Link>
                {/* <Link onClick={this.navClick.bind(this,2)} title="Admin Home" to ="/adminhome"><FaUserShield/></Link> */}
            </div>
        )

        const userLink = (
            <div style={{backgroundColor: this.state.bgColor}} class="nav2">
                <Link onClick={this.navClick.bind(this,1)} title="Home" to ="/"><AiFillHome/></Link>
                <Link onClick={this.navClick.bind(this,1)} title="Search for scholarships" to ="/results"><FaSearch/></Link>
                <Link onClick={this.navClick.bind(this,0)} title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                <a href="" title="You leaving? :(" onClick={this.logout.bind(this)}><IoMdLogOut/></a>
                <Link onClick={this.navClick.bind(this,1)} title="Admin Home" to ="/adminHome"><FaUserShield/></Link>
            </div>
        )

        return (
            <nav className="Navbar">
                {localStorage.usertoken ? userLink : loginRegLink}
            </nav>
        );
    }
}

export default NavBar;