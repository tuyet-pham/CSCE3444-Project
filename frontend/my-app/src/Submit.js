import React from 'react';
import './App.css';

class Submit extends React.Component {
    render () {
        return (
            <div class="SubmissionBackground">
                <div class="title">
                       Submit Scholarship Listing
                </div>
                <div class="flex-viewSub">
                    <div>
                        <form>
                            <label class="labelSub" for="fname">Name of Scholarship</label>
                            <input class="admininput" type="text" id="fname" name="firstname" placeholder="Your name.."/>
                            <br/>        
                            <label class="labelSub" for="lname">Last Name</label>
                            <input class="admininput" type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                            <br/>        
                            <input class="flatButton" type="submit" value="Submit Scholarship"/>
                        </form>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Submit;
