import React from 'react';
/*import { FaMapMarkerAlt } from 'react-icons/fa';*/
/*import { FaEnvelope } from 'react-icons/fa';*/
import './App.css';

class Footer extends React.Component {
    render () {
        return (
            <div className="App">
                <div class="App-footer row">
                    {/*<FaMapMarkerAlt />*/}
                    <div class="column">
                        1155 Union Circle<br />
                        Denton, Texas 76203-5017
                    </div>
                    {/*FaEnvelope*/}
                    <div class="column">
                        scholarscrape@fake_email.io
                    </div>
                </div>
            </div>
        );
    }
}
  
export default Footer;