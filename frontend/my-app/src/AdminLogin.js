import React from 'react';
import './App.css';

class AdminLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    
    onRegister(){
        //go to register page
    }

    onLogin(e){

        var userinfo = document.getElementsByName("userinfo");
        this.validate(userinfo);
        this.setState = ({ 
            username: document.getElementById("username"),
            password: document.getElementById("password")
        })
    }

    validate(e){

    }

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
                    <form>
                        <input class="admininput" type="text" id="username" name="userinfo" placeholder="Username" /> <br />
                        <input class="admininput" type="password" id="password " name="userinfo" placeholder="Password" /> <br />
                        <br />
                        <input type="submit" class="flatButton"  value="Login"/>
                        <button onClick={this.onRegister} class="flatButton">Register</button>
                        <br /><br /><br />
                    </form>
                    <a class="forgotpassword" href="Forgotpassword.page">forgot password or username?</a>
                    <br /><br />  
                </div>
            </div>
        );
    }
}

export default AdminLogin;
