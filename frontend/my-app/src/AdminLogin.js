import React from 'react';
import './App.css';

class AdminLogin extends React.Component {
    render () {
        return (
            <div className="AdminBackground" >
                <div class="App-header-login">
                    <h1 class="App-header-contents" >
                            <img class="App-logo" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/> 
                            <br />
                            Admin Login
                    </h1>
                </div>
                <div>
                    <input class="admininput" type="text" name="username" placeholder="Username" /> <br />
                    <input class="admininput" type="password" name="passwd" placeholder="Password" /> <br />
                    <br />
                    <button class="flatButton" onclick="checkAdmin()">Login</button>
                    <button class="flatButton" onclick="registerAdmin()">Register</button>
                     <br /><br /><br />
                    <a class="forgotpassword" href="Forgotpassword.page">forgot password or username?</a>
                    <br /><br />  
                </div>
            </div>
        );
    }
}

export default AdminLogin;
