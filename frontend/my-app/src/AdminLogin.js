import React from 'react';
import './App.css';
import Recaptcha from "react-recaptcha"
import { login } from './utils/api_functions';

class AdminLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isVerified: false,
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyHuman = this.verifyHuman.bind(this);
    }

    //Make sue the Recaptcha loaded correctly
    recaptchaLoaded() {
        console.log("Recaptcha Sucessfully loaded!");
    }

    //Get the reponse of the Recaptcha and change the value
    verifyHuman(response) {
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }

    //Handles the state change of values when submit clicked.
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    //Handles the submission button when clicked. Validating the values.
    handleSubmit = (e) => {
        // window.location.reload(false)
        e.preventDefault();
        const errormsg = "Please verify that you are a human";
        if(this.state.isVerified === false){
            alert(errormsg);
        }
        else{
            const user = {
                username: this.state.username,
                password: this.state.password
            }

            login(user).then(res => {
                if (!res.error) {
                    console.log(res);
                    localStorage.setItem('usertoken', res.token);
                    this.props.history.push(`/adminhome`);
                }
                else{
                    alert("Incorrect Login. Please Try again");
                }
            })
        }
    }

    onRegister(){
        //go to register page
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
                    <form onSubmit={this.handleSubmit}>
                        <input class="admininput" type="text" name="username" placeholder="Username" value={this.state.value} onChange={this.handleChange} required/> <br />
                        <input class="admininput" type="password" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required/> <br />
                        <br />
                        <input type="submit" class="flatButton" value="Login"/>
                        {/* <button onClick={this.onRegister} class="flatButton">Register</button> */}
                        <br /><br /><br />
                    </form>
                    <div class="recaptchaDiv">
                        {/* The Recaptcha  */}
                        <Recaptcha
                            sitekey="6Lc99cUUAAAAAHuqgpFUsTsBUhAmZna0wIkZAd-r"
                            render="explicit"
                            verifyCallback={this.verifyHuman}
                            onloadCallback={this.recaptchaLoaded}
                        />
                    </div>
                    {/* <a class="forgotpassword" href="Forgotpassword.page">forgot password or username?</a> */}
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default AdminLogin;
