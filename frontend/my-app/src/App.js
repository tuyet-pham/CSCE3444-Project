import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AdminLogin from './AdminLogin';
import AdminHome from './AdminHome';
import './index.css';
import Home from './Home';
import Results from './Results';
import Submit from './Submit';
import Footer from './Footer';
import {AiFillHome} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md"
import {FaUserCircle} from "react-icons/fa"
  

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bgColor: "#07bd65"
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
    }

    render () {
        return (
            <div className="App">
                <Router>
                    <div style={{backgroundColor: this.state.bgColor}} class="nav2">
                        <Link onClick={this.navClick.bind(this,1)} title="Home" to ="/"><AiFillHome/></Link>
                        <Link onClick={this.navClick.bind(this,1)} title="Search for scholarships" to ="/search"><FaSearch/></Link>
                        <Link onClick={this.navClick.bind(this,0)} title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                        <Link onClick={this.navClick.bind(this,2)} title="Admin Login" to ="/adhome"><FaUserCircle/></Link>
                        {/* <Link title="Admin Home" to ="/adhome">AdminHome</Link> */}
                    </div>
                    <Switch>
                        <Route path="/adhome">
                            <AdminHome />
                        </Route>
                        <Route path="/login">
                            <AdminLogin />
                        </Route>
                            <Route path="/search">
                            <Results />
                        </Route>
                        <Route path="/submit">
                            <Submit />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
                <Footer/>       
            </div>
        );
    }
}

export default App;
