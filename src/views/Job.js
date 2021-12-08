import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';

class Job extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            jobs: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/jobs/`, {
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
                    this.setState({jobs: response.output});
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
                        <Card.Title>View All jobs</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>ShipStation Order Id</b></th>
                                        <th><b>Design Submission Id</b></th>
                                        <th><b>Product Id</b></th>
                                        <th><b>Printfile Id</b></th>
                                        <th><b>Status</b></th>
                                        <th><b>WorkStation Id</b></th>
                                        <th><b>Quantity</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.jobs.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["shipStationOrderId"]}</td>
                                            <td>{prop["designSubmissionId"]}</td>
                                            <td>{prop["productId"]}</td>
                                            <td>{prop["printFileId"]}</td>
                                            <td>{prop["status"]}</td>
                                            <td>{prop["workStationId"]}</td>
                                            <td>{prop["quantity"]}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>      
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Job;