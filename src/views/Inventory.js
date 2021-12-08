import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';

class Inventory extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            materialInventories: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/materialinventories/`, {
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
                    this.setState({materialInventories: response.output});
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
                        <Card.Title>View All Material Inventories</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Name</b></th>
                                        <th><b>Unit</b></th>
                                        <th><b>Quantity</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.materialInventories.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["unit"]}</td>
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

export default Inventory;