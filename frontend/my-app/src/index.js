import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
//import Results from './Results';
import AdminLogin from './AdminLogin';
import AdminHome from './AdminHome';
import Footer from './Footer';
import App from './App';
import * as serviceWorker from './serviceWorker';

// //Home page
ReactDOM.render(<App />, document.getElementById('root'));

// //Search result page


// //Admin login
ReactDOM.render(<AdminLogin />, document.getElementById('adminlogin'));

//Admin home
//This is for testing purposes. You can pass in elements via the 'constructor'. 
// const basicinfo = {
//     user: 'Jeff',
//     lastscraped: '10-20-2018',
//     id: '13563',
//     requested: '9',
//     reported: '10',
//     all: '503'
// };
ReactDOM.render(<AdminHome {...basicinfo}/>, document.getElementById('adminhome'));



//Footer (appears on all pages)
ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
