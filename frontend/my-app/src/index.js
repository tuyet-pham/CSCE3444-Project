import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainHeader from './App';
import Home from './Home';
import Footer from './Footer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainHeader />, document.getElementById('mainheader'));
ReactDOM.render(<Home />, document.getElementById('home'));
ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
