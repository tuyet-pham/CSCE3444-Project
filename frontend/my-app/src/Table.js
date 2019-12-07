import React from 'react';
import './App.css';
import {fetchAdminTable} from './utils/api_functions';


function TableList(props)
{
    const list = props.itemsList;
    const updatedList = list.map((listItems)=>{
        return<li key={listItems.toString()}>
            {listItems.name}
            {listItems.URL}
            {listItems.amount}
            {listItems.description}
            {listItems.deadline}
        </li>
    });
    return(
        <ul>{updatedList}</ul>
    );
}

class Listing extends React.Component {
    constructor(props){
        super(props);
    }

    render (){
        var status;
        if (this.props.status > 0) {
            status = "Reported"
        } else {
            status = "Awaiting Approval"
        }
        return (
            <tr>
                <td><input type="checkbox" name="RowT" value="value"></input></td>
                <td>{status}</td>
                <td>{this.props.name}</td>
                <td>{this.props.URL}</td>
                <td>{this.props.amount}</td>
                <td> <div style={{height:"100px", overflow:"auto"}}>{this.props.description}</div></td>
                <td>{this.props.deadline}</td>
            </tr>
        )
    }
}

class TableP extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listItems: "",
            all: "this.props.all",
            response: [],
            status: "",
            name: "this.state.name",
            URL: "",
            amount: "",
            description: "",
            deadline: ""
        };
    }

    componentWillMount() {
        fetchAdminTable().then(api_response => {
            console.log(api_response);
            this.setState({
                response: api_response
            });
        });
    }

    render(){
        let display;
        let display2;
        if(this.state.response === null) {
            display = <Listing status="Awaiting Approval" name="Pedro" URL="https://youtube.com" amount="69420" description="a piece of writing that partakes of the nature of both speech and song that is nearly always rhythmical, usually metaphorical, and often exhibits such formal elements as meter, rhyme, and stanzaic structure.a piece of writing that partakes of the nature of both speech and song that is nearly always rhythmical, usually metaphorical, and often exhibits such formal elements as meter, rhyme, and stanzaic structure.a piece of writing that partakes of the nature of both speech and song that is nearly always rhythmical, usually metaphorical, and often exhibits such formal elements as meter, rhyme, and stanzaic structure." deadline="2019-12-06"/>
            // display2 = <Table URL="https://youtube.com" amount="69420" description="Good Meme" deadline="2019-12-06"/>
        } else {
            display = this.state.response.map((value, index) => {
                return (<Listing key={value.idScholarship} status={value.accp_status} name={value.name} URL={value.url} amount={value.amount} description={value.description} deadline={value.deadline} />)
            })
        }
        return(
            <div>
                <table>
                    <tr>
                        <th></th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Deadline</th>
                    </tr>
                    <tbody>
                        {display}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableP;