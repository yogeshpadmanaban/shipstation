import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

class ListOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOrders: [],
            // fields: { status: '' }
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

    // handleOnChange = (e) => {
    //     let fields = this.state.fields;
    //     fields[e.currentTarget.id] = e.currentTarget.files;
    //     this.setState({ fields })
    // }

    // handleOnSubmit(event) {
    //     event.preventDefault();
    //     console.log(event.target.orderId.value);
    //     if(event.target.orderId.value) {
    //         axios.get(`http://localhost:8082/api/v1/orders/listorders/${event.target.orderId.value}`).then(res => {
    //             if (res && res.data && res.data.success && res.data.output[0]) {
    //                 console.log( res.data.output[0].items);
    //                 this.setState({ ListOrderItems: res.data.output[0].items});
    //             }
    //         })
    //     }
    //     else {
    //         alert("Please fill requried fields");
    //     }
    // }

    render() {
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        {/* <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control type="text" placeholder="Enter status" id="status" name="status" value={this.state.fields.status} onChange={(e) => { this.handleOnChange(e) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a status.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button  type="submit" variant="primary">submit</Button>
                            </Col>
                        </Form> */}
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