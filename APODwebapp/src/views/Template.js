import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';

class Template extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            templates: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/templates/`, {
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
                    this.setState({templates: response.output});
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
                        <Card.Title>View All Templates</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Template Name</b></th>
                                        <th><b>Width</b></th>
                                        <th><b>Height</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.templates.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["templateName"]}</td>
                                            <td>{prop["width"]}</td>
                                            <td>{prop["height"]}</td>
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

export default Template;