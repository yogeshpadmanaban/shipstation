import Button from '@restart/ui/esm/Button';
import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import { CSVLink } from "react-csv";

class DesignSubmissions extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            designSubmissions: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/designsubmissions/`, {
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
                    this.setState({designSubmissions: response.output});
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
                        <Card.Title>Design Submissions</Card.Title>
                        <Row>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>UserId</b></th>
                                        <th><b>Title</b></th>
                                        <th><b>TemplateId</b></th>
                                        <th><b>ProductIdArray</b></th>
                                        <th><b>DesignCode</b></th>
                                        <th><b>Status</b></th>
                                        <th><b>Update</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.designSubmissions.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["userAccountId"]}</td>
                                            <td>{prop["title"]}</td>
                                            <td>{prop["templateId"]}</td>
                                            <td>{prop["productIdArray"]}</td>
                                            <td>{prop["designCode"]}</td>
                                            <td>{prop["status"]}</td>
                                            <td><Button>Update</Button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>      
                        </Row>
                        <CSVLink data={this.state.designSubmissions}>Generate CSV</CSVLink>         
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default DesignSubmissions;