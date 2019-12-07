// packages import goes here
import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

// components/pages import goes here
import AdminLogin from './AdminLogin';
import AdminHome from './AdminHome';
import NavBar from './NavBar';
import Home from './Home';
import Results from './Results';
import Submit from './Submit';
import Footer from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
        return (
            <Router>
                <div className="App">
                <NavBar history={this.props.history} />
                <Route exact path="/" component={Home} />
                    <div className="App">
                        <Route exact path="/adminlogin" component={AdminLogin} />
                        <Route exact path="/results" component={Results} />
                        <Route exact path="/submit" component={Submit} />
                        <Route exact path="/adminhome" component={AdminHome} />
                    </div>
                </div>
                <Footer/>
            </Router>
        );
    }
}

export default App;
