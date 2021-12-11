import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';

class WorkStation extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            workstations: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/workstations/`, {
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
                    this.setState({workstations: response.output});
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
                        <Card.Title>View All Work Stations</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Name</b></th>
                                        <th><b>HTML</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.workstations.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["html"]}</td>
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

export default WorkStation;