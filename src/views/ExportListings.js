import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import { CSVLink } from "react-csv";

class ExportListings extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {designSubmissionId: '', userId: '', productId: '', imageDesc: '', file: null},
            errors: {},
            mockups: [],
            validated: false
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/mockups/useraccount/${sessionStorage.getItem('userAccountId')}`, {
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
                    this.setState({mockups: response.output});
                }else{
                    console.log(response);
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
                        <Card.Title>View All Mockups</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Design Submission Id</b></th>
                                        <th><b>Product Id</b></th>
                                        <th><b>User Id</b></th>
                                        <th><b>Image Description</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.mockups.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["designSubmissionId"]}</td>
                                            <td>{prop["productId"]}</td>
                                            <td>{prop["userId"]}</td>
                                            <td>{prop["imageDescription"]}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>      
                        </Row>
                        <CSVLink data={this.state.mockups}>Generate CSV</CSVLink>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default ExportListings;