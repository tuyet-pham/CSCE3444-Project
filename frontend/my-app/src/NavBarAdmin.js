// packages import goes here
import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

// Icon import goes here
import {FaUserShield} from "react-icons/fa";
import {MdViewList} from "react-icons/md";


class NavBarAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div className="NavbarAdmin">
                <div>
                    <Link title="Admin Home" to ="/adminHome"><FaUserShield/></Link>
                    <Link title="View all Scholarships" to ="/results"><MdViewList/></Link>
                </div>
            </div>
        );
    }
}

export default NavBarAdmin;