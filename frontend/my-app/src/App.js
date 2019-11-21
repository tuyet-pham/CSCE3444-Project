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
import {AiFillHome} from "react-icons/ai";
import {FaSearch} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md"
<<<<<<< HEAD
import {FaUserCircle} from "react-icons/fa"
=======
//import {IoMdLogIn} from "react-icons/iomd"
>>>>>>> 8d42379f7afb533b21cf9095571154f4b60021c8
  

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bgColor: "#40bf40"
        }
    }

    // https://hackernoon.com/passing-arguments-to-react-event-handlers-the-easy-way-3bf8e52f7705
    navClick (e) {
        if(e == 0){
            this.setState({
            bgColor: "rgb(133, 255, 164, .5)"
            })
        }
        else if (e == 1){
            this.setState({
                bgColor: "#40bf40"
            })
        }
        else if (e == 2){
            this.setState({
                bgColor: "whitesmoke"
            })
        }
    }

    render () {
        return (
            <div className="App">
                <Router>
<<<<<<< HEAD
                    <div style={{backgroundColor: this.state.bgColor}} class="nav2">
                        <Link onClick={this.navClick.bind(this,1)} title="Home" to ="/"><AiFillHome/></Link>
                        <Link onClick={this.navClick.bind(this,1)} title="Search for scholarships" to ="/search"><FaSearch/></Link>
                        <Link onClick={this.navClick.bind(this,0)} title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                        <Link onClick={this.navClick.bind(this,2)} title="Admin Login" to ="/login"><FaUserCircle/></Link>
                        {/* <Link title="Admin Home" to ="/adhome">AdminHome</Link> */}
=======
                    <div class="nav2">
                        <Link title="Home" to ="/root"><FaHome/></Link>
                        <Link title="Search for scholarships" to ="/search"><FaSearch/></Link>
                        <Link title="Add a listing" to ="/submit"><MdAddCircle/></Link>
                        <Link title="Admin Login" to ="/login">Login</Link>
>>>>>>> 8d42379f7afb533b21cf9095571154f4b60021c8
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
            </div>
        );
    }
}

export default App;
