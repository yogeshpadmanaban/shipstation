import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';

class ListCarriers extends Component{
    constructor(props){
        super(props);
        this.state = {
            ListCarriers: []
        }
    }

    componentDidMount(){
        axios.post(`http://localhost:8082/api/v1/listcarriers`, '').then(res => {
            if(res && res.data && res.data.success) {
                this.setState({ListCarriers: res.data.output});
                console.log("res", res.data.output);
            }
      })
    }
 
    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>List Carriers</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>name</b></th>
                                        <th><b>nickname</b></th>
                                        <th><b>code</b></th>
                                        <th><b>accountNumber</b></th>
                                        <th><b>balance</b></th>
                                        <th><b>shippingProviderId</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListCarriers.map((prop) => {
                                        return <tr>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["nickname"]}</td>
                                            <td>{prop["code"]}</td>
                                            <td>{prop["accountNumber"]}</td>
                                            <td>{prop["balance"]}</td>
                                            <td>{prop["shippingProviderId"]}</td>
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

export default ListCarriers;