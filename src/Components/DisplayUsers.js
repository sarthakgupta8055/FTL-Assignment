import React from 'react';
import data from '../SampleData.json';
import '../DisplayUsers.css'

import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Users extends React.Component{
    constructor(props){
        super();
        this.state = {
            members : data.members,
            isOpen: false,
            Member : null,
            MemberName : "",
            MemberActivity : []
        }
    }
    componentDidMount(){
    }
    handleClick(MemberObj){
        this.setState({
          Member : MemberObj,
          MemberName : MemberObj.real_name,
          MemberActivity : MemberObj.activity_periods
        }, () => (this.openModal()))
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render(){
        return(
            <React.Fragment>
                <div className={"container bg-light shadow p-3 mb-5 bg-white rounded"} id={"table-container"}>
                  <table className={"custom-table"}>
                    <tbody>
                      <tr>
                        <th className={"custom-table"}>Candidate</th>
                        <th className={"custom-table"}>No. of Logs</th>
                      </tr>
                      {this.state.members.map(Member =>{
                            return(
                              <tr key={Member.id} className={"pointer"} onClick={() => this.handleClick(Member)}>
                                    <td className={"custom-table"}>{Member.real_name}</td>
                                    <td className={"custom-table"}>{Member.activity_periods.length}</td>
                              </tr>
                            )
                        })
                      }
                      </tbody>
                  </table>
                    
                </div>
                
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.MemberName}</Modal.Title>
          </Modal.Header>
          <div>
            {this.state.MemberActivity.map(Activity =>{
              return(
                <Modal.Body>{Activity.start_time} {Activity.end_time}</Modal.Body>
              )
            })}
          </div>
          <Modal.Footer>
            <Button onClick={this.closeModal}>
              Close
            </Button>
            <Button onClick={this.closeModal} style={{padding: "0px"}}>
              <Link to={{pathname: "/Calendar", data: this.state.MemberActivity }} className="nav-link text-white">Calendar View</Link>
            </Button>
          </Modal.Footer>
        </Modal>

       </React.Fragment>
        )
    }
}
export default Users;