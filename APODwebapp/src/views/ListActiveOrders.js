import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

class ListActiveOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListActiveOrders: [],
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8082/api/v1/orders/listorders/activestatus`, '').then(res => {
            if (res && res.data && res.data.success) {
                this.setState({ ListActiveOrders: res.data.output });
                console.log("res", res.data.output);
            }
        })
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>List Active Orders</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Order Id</b></th>
                                        <th><b>Customer OrderNumber</b></th>
                                        <th><b>Overall Status</b></th>
                                        <th><b>Age of the order</b></th>
                                        <th><b>Order Qty</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListActiveOrders.map((prop) => {
                                        return <tr>
                                            <td>{prop["orderId"]}</td>
                                            <td>{prop["orderNumber"]}</td>
                                            <td>{prop["orderStatus"]}</td>
                                            <td>{prop["orderDate"]}</td>
                                            <td>{prop["items"].length}</td>
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

export default ListActiveOrders;