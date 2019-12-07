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
        }
    }

    logout(e) {
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }


    render() {
        const loginRegLink = (
            <div class="nav2">
                <Link title="Home" to ="/"><AiFillHome/></Link>
                <Link title="Search for scholarships" to ="/results"><FaSearch/></Link>
                <Link title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                <Link title="Admin Login" to ="/adminlogin"><FaUserCircle/></Link>
            </div>
        )

        const userLink = (
            <div class="nav2">
                <Link title="Home" to ="/"><AiFillHome/></Link>
                <Link title="Search for scholarships" to ="/results"><FaSearch/></Link>
                <Link title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                <a href="" title="You leaving? :(" onClick={this.logout.bind(this)}><IoMdLogOut/></a>
                <Link title="Admin Home" to ="/adminHome"><FaUserShield/></Link>
            </div>
        )
        return (
            <nav className="Navbar">
                {localStorage.usertoken? userLink : loginRegLink}
            </nav>
        );
    }
}

export default NavBar;