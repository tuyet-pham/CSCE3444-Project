import React from 'react';
import './App.css';

class Home extends React.Component {
    render () {
        return (
            <div className="App">
                <div id="scholarScrapeDescription" style={{paddingTop:"10px", paddingBottom:"10px"}}>
                    <h2> How to use ScholarScrape </h2>
                    {/*put scraper tips here*/}
                    <div class="row">
                        <div class="floatingBox">
                            <h3>
                                Search for Scholarships
                            </h3>
                            <span> {/* I want to add some padding between the text and the edge of the box here, but inline styling isn't working.*/}
                                In the search box above, type in
                                the criteria you want to search by - 
                                your major, your hobbies, or something
                                else that makes you special - then click
                                "Go" to see what scholarships we have
                                in store for you.
                            </span>
                        </div>
                        <div class="floatingBox">
                            <h3>
                                Apply for Greatness
                            </h3>
                            <span>
                                Once you find a scholarship you like,
                                you can click "View More" and visit its
                                website to apply. There is no limit on the 
                                amount of scholarships you can inspect here
                                on ScholarScrape, so apply for as many
                                scholarships as you like.
                            </span>
                        </div>
                        <div class="floatingBox">
                            <h3>
                                Contribute to the Community
                            </h3>
                            <span>
                                Know about a scholarship opportunity
                                that you'd like to share with other students
                                like you? You can submit scholarships by
                                clicking "Contribute" on this page. If the
                                site admins approve your submission, it
                                will be added to our database.
                            </span>
                        </div>
                    </div>
                </div>
        
                
                <div id="meetTheTeam" style={{background: "var(--ss-light-green)", paddingTop: "10px", paddingBottom: "10px", marginTop: "10px"}}>
                    <h2> Meet the Team </h2>
                    {/*put team info here*/}
                    <div class="floatingBox2">
                        <h3>
                            Tii
                        </h3>
                        <span>
                            A normal human living person
                        </span>
                    </div>
                    <div class="floatingBox2">
                        <h3>
                            Pedro
                        </h3>
                        <span>
                            A normal human with a hat
                        </span>
                    </div>
                    <div class="floatingBox2">
                        <h3>
                            Joe
                        </h3>
                        <span>
                            A normal human with a beard
                        </span>
                    </div>
                    <div class="floatingBox2">
                        <h3>
                            Avery
                        </h3>
                        <span>
                            Often seen doing human activities
                        </span>
                    </div>
                    <div class="floatingBox2">
                        <h3>
                            Peyton
                        </h3>
                        <span>
                            Eats normal human food, like crushed ice
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;