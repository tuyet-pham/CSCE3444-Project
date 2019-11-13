import React from 'react';
import './App.css';

class MainHeader extends React.Component {
    render () {
        return (
            <div className="App" class="App-header">
                <h1 class="App-header-contents">
                    <img class="App-logo" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/> 
                    ScholarScraper 
                </h1>
                <div class="Search-bar">
                    <input type="text" placeholder="Search scholarships..." name="search" />
                    <button type="submit">Go</button>
                </div>
            </div>
        );
    }
}

export default MainHeader;
