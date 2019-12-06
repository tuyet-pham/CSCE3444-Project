import React from 'react';
import './App.css';


class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render (){
        return (
            <div classname="adminTable">
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <th><input type="checkbox" name="RowT" value="value"></input></th>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Deadline</th>
                            </tr>
                            <tr>

                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}

export default Table;