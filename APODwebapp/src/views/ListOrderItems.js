import React, { Component } from 'react';
import {  Card, Container, Form, Button, Row, Col, Table  } from 'react-bootstrap';
import axios from 'axios';

class ListOrderItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOrderItems: [],
            fields: { orderId: '' }
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange = (e) => {
        let fields = this.state.fields;
        fields[e.currentTarget.id] = e.currentTarget.files;
        this.setState({ fields })
    }

    handleOnSubmit(event) {
        event.preventDefault();
        console.log(event.target.orderId.value);
        if(event.target.orderId.value) {
            axios.get(`http://localhost:8082/api/v1/orders/listorders/${event.target.orderId.value}`).then(res => {
                if (res && res.data && res.data.success && res.data.output[0]) {
                    console.log( res.data.output[0].items);
                    this.setState({ ListOrderItems: res.data.output[0].items});
                }
            })
        }
        else {
            alert("Please fill requried fields");
        }
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>OrderId</Form.Label>
                                    <Form.Control type="text" placeholder="Enter orderId" id="orderId" name="orderId" value={this.state.fields.orderId} onChange={(e) => { this.handleOnChange(e) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a orderId.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button  type="submit" variant="primary">submit</Button>
                            </Col>
                        </Form>
                        <Card.Title>List Orders Items</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>APOD OrderNumber</b></th>
                                        <th><b>Item Sku</b></th>
                                        <th><b>Item Name</b></th>
                                        <th><b>Order Qty</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListOrderItems.map((prop) => {
                                        return <tr>
                                            <td>{prop["lineItemKey"]}</td>
                                            <td>{prop["sku"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["quantity"]}</td>
                                        </tr>
                                    })}
                                    {
                                        this.state.ListOrderItems && this.state.ListOrderItems.length == 0 &&
                                        <div className='text-center'> No Record found </div>
                                    }
                                </tbody>
                            </Table>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default ListOrderItems;