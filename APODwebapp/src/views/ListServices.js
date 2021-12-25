import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class ListServices extends Component{
    constructor(props){
        super(props);
        this.state = {
            ListServices: [],
            fields: { carrierCode: '' }
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
        if(event.target.carrierCode.value) {
            axios.get(`http://localhost:8082/api/v1/carriers/listservices/${event.target.carrierCode.value}`).then(res => {
                if (res && res.data && res.data.success) {
                    this.setState({ ListServices: res.data.output });
                }
            })
        } else {
            alert("Please fill requried fields");
        }
    }

 
    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CarrierCode *</Form.Label>
                                    <Form.Control type="text" placeholder="Enter carrierCode" id="carrierCode" name="carrierCode" value={this.state.fields.carrierCode} onChange={(e) => { this.handleOnChange(e) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a carrierCode.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button  type="submit" variant="primary">submit</Button>
                            </Col>
                        </Form>
                        <Card.Title>List Services</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>carrierCode</b></th>
                                        <th><b>code</b></th>
                                        <th><b>name</b></th>
                                        <th><b>domestic</b></th>
                                        <th><b>international</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListServices && this.state.ListServices.length > 0 && this.state.ListServices.map((prop) => {
                                        return <tr>
                                            <td>{prop["carrierCode"]}</td>
                                            <td>{prop["code"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["domestic"] ? 'Yes' : 'No'}</td>
                                            <td>{prop["international"] ? 'Yes' : 'No'}</td>
                                        </tr>
                                    })}
                                    {
                                        this.state.ListServices && this.state.ListServices.length == 0 &&
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

export default withRouter(ListServices);