import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';

class ListOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOrders: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8082/api/v1/orders/listorders/`, '').then(res => {
            if (res && res.data && res.data.success) {
                this.setState({ ListOrders: res.data.output });
                console.log("res", res.data.output);
            }
        })
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>List Orders</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Order Id</b></th>
                                        <th><b>Customer OrderNumber</b></th>
                                        {/* <th><b>APOD OrderNumber</b></th> */}
                                        <th><b>Overall Status</b></th>
                                        <th><b>Age of the order</b></th>
                                        {/* <th><b>Item Sku</b></th>
                                        <th><b>Item Name</b></th>
                                        <th><b>Item Qty</b></th>

                                        <th><b>Size</b></th>
                                        <th><b>APOD Product</b></th> */}
                                        <th><b>Order Qty</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListOrders.map((prop) => {
                                        return <tr>
                                            <td>{prop["orderId"]}</td>
                                            <td>{prop["orderNumber"]}</td>
                                            {/* <td>Items lineItemKey</td> */}
                                            <td>{prop["orderStatus"]}</td>
                                            <td>{prop["orderDate"]}</td>
                                            {/* <td>Items Sku</td>
                                            <td>Items Name</td>
                                            <td>Items Qty</td>
                                            <td>Size</td>
                                            <td></td> */}
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

export default ListOrders;