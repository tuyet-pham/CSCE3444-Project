import React from 'react';
import './App.css';


class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render (){
        const scholarshipData = {
            row: [
                {id: this.props.id},
                {name: this.props.name},
                {description: this.props.description}

            ]
        }

        return (
            <div>
                Prop test : {this.props.message}      
               <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
               </table>
            </div>
        )
    }
}

export default Table;