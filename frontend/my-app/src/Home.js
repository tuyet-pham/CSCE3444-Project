import React from 'react';
import './App.css';
import {FaUser} from "react-icons/fa"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    render () {
        return (
            <div className="App">
                <div class="App-header">
                    <h1 class="App-header-contents">
                        <img class="App-logo" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/> 
                        ScholarScraper 
                    </h1>
                </div>

                {/*put scraper tips here*/}
                <div id="scholarScrapeDescription" style={{padding:"20px", backgroundColor:"white"}}>
                    <hr class="new1"/>
                    <p> 
                        <h1 class="howto">How to use ScholarScrape </h1>
                        Using ScholarScraper is easy! Here's some quick tips.
                    </p>
                    {/* slide show here */}
                    <div class="carouselContainer">
                        <Carousel showArrows={false} infiniteLoop={true} stopOnHover={true} showStatus={false} showThumbs={false} autoPlay>
                                <div>
                                    <img class="App-tip" src={process.env.PUBLIC_URL + "slide1.png"} alt="slide 1"/>
                                </div>
                                <div>
                                    <img class="App-tip" src={process.env.PUBLIC_URL + "slide2.png"} alt="slide 1"/>
                                </div>
                                <div>
                                    <img class="App-tip" src={process.env.PUBLIC_URL + "slide3.png"} alt="slide 1"/>
                                </div>
                        </Carousel>
                    </div>
                        <hr class="new1"/>
                    </div>
                <div class="meetTheTeam">
                    <p class="howto"><h2>Meet the Team</h2></p>

                    <div class="divteamSize">
                    {/* user description area */}
                    <div class="row" style={{margin:"auto"}}>
                    <div class="container">
                        <div class="userdescText userdesc">
                            <h2>Tii</h2>
                            Wanna be Full stack developer. 
                            <br />Graduated from the University of North 
                            <br />Texas.
                        </div>
                        <div class="dot" >
                            <h2>Tii</h2>
                            <span class="usericon "><FaUser/></span>
                        </div>    
                    </div>

                    <div class="container">
                        <div class="userdescText userdesc">
                            <h2>Pedro</h2>
                            Game developer. Want to work for
                            <br />an indie game company.
                            <br />Graduated from the University of North 
                            <br />Texas.
                        </div>
                        <div class="dot">
                            <h2>Pedro</h2>
                            <span class="usericon "><FaUser/></span>
                        </div>
                    </div>

                    <div class="container">
                        <div class="userdescText userdesc">
                            <h2>Joe</h2>
                            About to be hired as a real developer.
                            <br />Graduated from the University of North 
                            <br />Texas. Getting paid the big bucks.
                        </div>
                        <div class="dot">
                            <h2>Joe</h2>
                            <span class="usericon "><FaUser/></span>
                        </div>
                    </div>
                    </div>
                    <div class="row" style={{margin:"auto"}}>
                    <div class="container">
                        <div class="userdescText userdesc">
                            <h2>Avery</h2>
                            Game developer. Want to work 
                            <br />for Blizzard. Graduated from the
                            <br />University of North Texas.
                        </div>
                        <div class="dot">
                            <h2>Avery</h2>
                            <span class="usericon "><FaUser/></span>
                        </div>
                    </div>
                    <div class="container">
                        <div class="userdescText userdesc">
                            <h2>Peyton</h2>
                            Awesome developer with a lot of 
                            <br />stickers. You know where to go. 
                            <br />Graduated from the University 
                            <br />of North Texas.
                        </div>
                        <div class="dot">
                            <h2>Peyton</h2>
                            <span class="usericon "><FaUser/></span>
                        </div>
                    </div>
                    </div>
                    {/* <div style={{width:"40%"}}>
                        <div><img style={{transform:"rotate(20deg)"}} class="cap" src={process.env.PUBLIC_URL + "cap.png"} /> </div>
                        <div><img style={{transform:"rotate(-30deg)"}} class="cap" src={process.env.PUBLIC_URL + "cap.png"} /></div>
                        <img style={{transform:"rotate(-40deg)"}} class="cap" src={process.env.PUBLIC_URL + "cap.png"} />
                        <img style={{transform:"rotate(30deg)"}} class="cap" src={process.env.PUBLIC_URL + "cap.png"} />
                    </div> */}
                </div>
            </div>    
        </div>
        );
    }
}

export default Home;