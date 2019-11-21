import React from 'react';
import './App.css';


{/* Forms reference: https://reactjs.org/docs/forms.html */}
class Results extends React.Component {
    render () {
        return (
            <div className="App-search-results">
                {/*HEADER GOES HERE */}

                <div class="Search-bar-wide">
                    <input type="text" placeholder="Search scholarships..." name="search" />
                    <button type="submit">Go</button>
                </div>

                <div class="column-30" style={{backgroundColor:"var(--ss-light-gray)"}}>
                    <h2 style={{color:"var(--ss-gray)"}}>
                        Filters
                    </h2>
                    <form id="filters">
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
                <div class="column-70">
                    oooooooooooooooob
                </div>
            </div>
        );
    }
}

export default Results;
