import React from 'react';
import './App.css';
import {FaUser} from "react-icons/fa"

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index : 1,
            user: ""
        }
    }

    render () {
        return (
            <div className="App-home">

                <div class="App-header">
                    <h1 class="App-header-contents">
                        <img class="App-logo" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/> 
                        ScholarScraper 
                    </h1>
                    <div class="Search-bar">
                        <input type="text" placeholder="Search scholarships..." name="search" />
                        <button type="submit">Go</button>
                    </div>
                </div>

                {/*put scraper tips here*/}
                <div id="scholarScrapeDescription" style={{padding:"20px"}}>
                    <hr class="new1"/>
                    <p  style={{padding:"20px 0px 20px 0px"}} class="howto"> 
                        <h2>How to use ScholarScrape </h2>
                        Using Scholarscrap is easy! Here's some quick tips.
                    </p>

                    {/* slide show here */}
                    <div style={{padding:"120px 0px 120px 10px"}} class="row">
                        <img class="App-tip" src={process.env.PUBLIC_URL + "slide1.png"} alt="slide 1"/> 
                        <img class="App-tip" src={process.env.PUBLIC_URL + "slide2.png"} alt="slide 2"/> 
                        <img class="App-tip" src={process.env.PUBLIC_URL + "slide3.png"} alt="slide 3"/>
                    </div>
                    <hr class="new1"/>
                </div>
                
                <div class="meetTheTeam">
                    <p style={{fontSize:"35px", textAlign:"left", padding:"20px 0px 20px 10%"}} class="howto"> 
                        <h2>Meet the Team</h2>
                    </p>
                    {/* user description area */}
                    
                    <div style={{width:"19%"}} class="userdesc"/>
                    <div style={{width:"19%"}} class="userdescCon"/>

                    <div style={{width:"60%"}}>
                        {/* user icons here */}
                        <div class="dot" >
                            <div class="container">
                                <div style={{left:"470%"}} class="userdescText">
                                    <h2>Tii</h2>
                                    Wanna be Full stack developer. 
                                    <br />Graduated from the University of North 
                                    <br />Texas.
                                </div>
                            
                                <h2 >Tii</h2>
                                <span class="usericon "><FaUser/></span>
                            </div>    
                        </div>

                        <div class="dot">
                        <div class="container">
                                <div style={{left:"345%"}} class="userdescText">
                                    <h2>Pedro</h2>
                                    Game developer. Want to work for
                                    <br />an indie game company.
                                    <br />Graduated from the University of North 
                                    <br />Texas.
                                </div>
                                <h2>Pedro</h2>
                                <span class="usericon "><FaUser/></span>
                            </div>
                        </div>

                        <div class="dot">
                            <div class="container">
                                <div style={{left:"220%"}} class="userdescText">
                                    <h2>Joe</h2>
                                    About to be hired as a real developer.
                                    <br />Graduated from the University of North 
                                    <br />Texas. Getting paid the big bucks.
                                </div>

                                <h2>Joe</h2>
                                <span class="usericon "><FaUser/></span>
                            </div>
                        </div>

                        <div class="dot">
                            <div class="container">
                                <div style={{left:"410%", top:"-83%"}} class="userdescText">
                                    <h2>Avery</h2>
                                    Game developer. Want to work 
                                    <br />for Blizzard. Graduated from the
                                    <br />University of North Texas.
                                </div>

                                <h2>Avery</h2>
                                <span class="usericon "><FaUser/></span>
                            </div>
                        </div>

                        <div class="dot">
                            <div class="container">
                                <div style={{left:"280%", top:"-83%"}} class="userdescText">
                                    <h2>Peyton</h2>
                                    Awesome developer with a lot of 
                                    <br />stickers. You know where to go. 
                                    <br />Graduated from the University 
                                    <br />of North Texas.
                                </div>

                                <h2>Peyton</h2>
                                <span class="usericon "><FaUser/></span>
                            </div>
                        </div>

                     </div>    
                </div>
            </div>
        );
    }
}

export default Home;