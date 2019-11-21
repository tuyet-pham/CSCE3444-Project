import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AdminLogin from './AdminLogin';
import './index.css';
import Home from './Home';
import Results from './Results';
import Submit from './Submit';
import {FaHome} from "react-icons/fa";
import {FaSearch} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md"
import {IoMdLogIn} from "react-icons/iomd"
  

class App extends React.Component {
    render () {
        return (
            <div className="App">
                <Router>
                    <div class="nav2">
                        <Link title="Home" to ="/root"><FaHome/></Link>
                        <Link title="Search for scholarships" to ="/search"><FaSearch/></Link>
                        <Link title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                        <Link title="Admin Login" to ="/login"><IoMdLogIn/></Link>
                    </div>
                   
                    <Switch>
                        <Route path="/login">
                            <AdminLogin />
                        </Route>
                            <Route path="/search">
                            <Results />
                        </Route>
                        <Route path="/submit">
                            <Submit />
                        </Route>
                        <Route path="/root">
                            <Home />
                        </Route>
                    </Switch>
                </Router>       
            </div>
        );
    }
}

export default App;
