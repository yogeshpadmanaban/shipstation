import React, { Component } from 'react';
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class UserAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            useraccounts: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/useraccounts/`, {
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    console.log(response);
                    this.setState({useraccounts: response.output});
                }else{
                    console.log(response.err);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title><b>View All Users</b></Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Username</b></th>
                                        <th><b>Email</b></th>
                                        <th><b>DesignIdPrefix</b></th>
                                        <th><b>DesignIdOffset</b></th>
                                        <th><b>Roles</b></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.useraccounts.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["userName"]}</td>
                                            <td>{prop["emailAddress"]}</td>
                                            <td>{prop["designIdPrefix"]}</td>
                                            <td>{prop["designIdOffset"]}</td>
                                            <td>{prop["roles"][0] === "A" ? 'Admin' : prop["roles"][0] === "C" ? 'Customer' : 'Worker'}</td>
                                            <td><Button type="button" variant="secondary" size="sm" onClick={() => {this.props.history.push('/admin/createuser',{action:"Update", id:prop["_id"]})}}>Update</Button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>      
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Button type="button" variant="primary" onClick={() => {this.props.history.push('/admin/createuser',{state:"Create"})}}>Create New User</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default withRouter(UserAccount);