import React from 'react';
import './App.css';


{/* Forms reference: https://reactjs.org/docs/forms.html */}
class Results extends React.Component {
    render () {
        return (
            <div className="App-search-results">
                {/*HEADER GOES HERE */}
                <div class="App-header">
                    <h1 class="App-header-contents">
                        <img class="App-logo" src={process.env.PUBLIC_URL + "scraper_logo.png"} alt="ScholarScraper logo"/> 
                        ScholarScraper 
                    </h1>
                </div>

                {/* SEARCH BAR */}
                <div class="Search-bar-wide">
                    <input type="text" placeholder="Search scholarships..." name="search" />
                    <button type="submit">Go</button>
                </div>

                <div class="row-flex">
                    {/* FILTERS */}
                    <div class="column-30" style={{backgroundColor:"var(--ss-light-gray)", textAlign:"left"}}>
                        <h2 style={{color:"var(--ss-gray)"}}>
                            Filters
                        </h2>
                        <form class="form-inline" id="filters">
                            <label>
                                Major*
                                <input type="text" name="major" placeholder="Computer Science"/>
                            </label>
                            <br />
                            <label>
                                GPA
                                <select>
                                    <option value="4.0">4.0</option>
                                    <option value="3.5">3.5-4.0</option>
                                    <option value="3.0">3.0-3.5</option>
                                    <option value="2.5">2.5-3.0</option>
                                    <option value="2.0">2.0-2.5</option>
                                    <option value="NA">None</option> {/*Default value*/}
                                </select>
                            </label>
                            <br />
                            <label>
                                Amount
                                <input type="number" name="amount"/>
                            </label>
                        </form>
                    </div>

                    {/* RESULTS */}
                    <div class="column-70">
                        {/* FOR result IN results */}
                        <div class="floatingBox3">
                            <h2>
                                %Result_Title%
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Elit ut aliquam purus sit. Urna duis convallis convallis tellus id interdum velit laoreet id. Risus nullam eget felis eget nunc lobortis mattis. Sed augue lacus viverra vitae congue eu consequat ac. Massa vitae tortor condimentum lacinia quis vel eros donec. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Vel facilisis volutpat est velit egestas dui. A pellentesque sit amet porttitor. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Mi tempus imperdiet nulla malesuada pellentesque. Mi bibendum neque egestas congue quisque egestas.        

                                Consequat semper viverra nam libero. Vivamus at augue eget arcu dictum varius. Nec dui nunc mattis enim ut. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Proin libero nunc consequat interdum varius sit amet mattis vulputate. Molestie at elementum eu facilisis sed odio morbi. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Placerat orci nulla pellentesque dignissim enim sit. Eu facilisis sed odio morbi. Vel facilisis volutpat est velit. Feugiat in fermentum posuere urna. In ante metus dictum at tempor commodo ullamcorper a lacus. Turpis egestas sed tempus urna et pharetra pharetra massa. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Nunc vel risus commodo viverra maecenas accumsan lacus.

                                Erat velit scelerisque in dictum non consectetur a erat. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Sit amet massa vitae tortor condimentum lacinia. Lectus magna fringilla urna porttitor rhoncus dolor purus non. Sit amet volutpat consequat mauris nunc. Amet purus gravida quis blandit turpis cursus. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Ornare lectus sit amet est placerat in egestas erat imperdiet. Feugiat in fermentum posuere urna nec tincidunt praesent. Netus et malesuada fames ac. Facilisis sed odio morbi quis commodo odio aenean.

                                Phasellus egestas tellus rutrum tellus pellentesque eu. Cras ornare arcu dui vivamus. Purus gravida quis blandit turpis cursus in. Sed vulputate mi sit amet mauris commodo quis. Quam pellentesque nec nam aliquam sem et tortor consequat. Sit amet facilisis magna etiam tempor orci eu. Odio eu feugiat pretium nibh ipsum consequat nisl. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Vitae auctor eu augue ut. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Mauris vitae ultricies leo integer malesuada nunc vel risus. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Condimentum lacinia quis vel eros donec ac odio. Nulla pellentesque dignissim enim sit amet venenatis urna cursus. Sed id semper risus in. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Velit laoreet id donec ultrices tincidunt arcu non sodales. Fringilla est ullamcorper eget nulla facilisi etiam dignissim.

                                Aliquam etiam erat velit scelerisque. Maecenas volutpat blandit aliquam etiam erat. Amet porttitor eget dolor morbi non arcu. Molestie a iaculis at erat pellentesque adipiscing. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Sodales ut eu sem integer vitae justo eget magna fermentum. Eget arcu dictum varius duis at consectetur lorem donec massa. Facilisi etiam dignissim diam quis enim lobortis. Ultrices gravida dictum fusce ut. Ultrices in iaculis nunc sed augue lacus. Leo vel fringilla est ullamcorper eget nulla facilisi etiam.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
