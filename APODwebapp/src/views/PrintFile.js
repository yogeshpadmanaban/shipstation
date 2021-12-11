import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';

class PrintFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            printfiles: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/printfiles/`, {
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
                    this.setState({printfiles: response.output});
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
                        <Card.Title>View All Print Files</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Design Submission Id</b></th>
                                        <th><b>Product Id</b></th>
                                        <th><b>User Id</b></th>
                                        <th><b>Size</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.printfiles.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["designSubmissionId"]}</td>
                                            <td>{prop["productId"]}</td>
                                            <td>{prop["userId"]}</td>
                                            <td>{prop["size"]}</td>
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

export default PrintFile;