import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class AddFunds extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: { carrierCode: '', amount: '' }
        };
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange = (e) => {
        let fields = this.state.fields;
        fields[e.currentTarget.id] = e.currentTarget.files;
        this.setState({ fields })
    }

    handleOnSubmit = (event) => {
        console.log(event.target.carrierCode.value);
        event.preventDefault()
    }

    render(){
        return(
            <>
                <Container fluid>
                    <Card.Header>Add Funds to Carrier</Card.Header>
                    <Card.Body>
                        <Form noValidate onSubmit={(e) => {this.handleOnSubmit(e)}}>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CarrierCode</Form.Label>
                                    <Form.Control type="text" placeholder="Enter carrierCode" id="carrierCode" name="carrierCode" value={this.state.fields.carrierCode} onChange={(e) => { this.handleOnChange(e) }}  required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a carrierCode.
                                    </Form.Control.Feedback>

                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="text" placeholder="Enter amount" id="amount" name="amount" value={this.state.fields.amount} onChange={(e) => { this.handleOnChange(e) }}  required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a amount.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button  type="submit" variant="primary">submit</Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Container>
            </>
        )
    }
}

export default withRouter(AddFunds);