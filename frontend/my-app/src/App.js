import React from 'react';
import ReactDOM from 'react-dom';

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
import AdminHome from './AdminHome';
import Footer from './Footer';
import Submit from './Submit';

  

class App extends React.Component {
    render () {
        return (
            <div className="App">
                <Router>
                    <div class="nav2">
                        <Link to ="/root">Home</Link>
                        <Link to ="/search">Search</Link>
                        <Link to ="/submit">Submit</Link>
                        <Link to ="/login">Login</Link>
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
