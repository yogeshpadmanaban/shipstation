import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
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

    // componentDidMount(){
    //     axios.post(`http://localhost:8082/api/v1/carriers/listservices?carrierCode=stamps_com`, { carrierCode: 'stamps_com' }).then(res => {
    //         if(res && res.data && res.data.success) {
    //             this.setState({ListServices: res.data.output});
    //         }
    //   })
    // }

    handleOnChange = (e) => {
        let fields = this.state.fields;
        fields[e.currentTarget.id] = e.currentTarget.files;
        this.setState({ fields })
    }

    handleOnSubmit(event) {
        console.log(event.target.carrierCode.value);
        event.preventDefault()
        axios.post(`http://localhost:8082/api/v1/carriers/listservices`,{ params: { carrierCode: event.target.carrierCode.value } }).then(res => {
            if (res && res.data && res.data.success) {
                this.setState({ ListServices: res.data.output });
            }
        })
    }
 
    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CarrierCode</Form.Label>
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
                                    {this.state.ListServices.map((prop) => {
                                        return <tr>
                                            <td>{prop["carrierCode"]}</td>
                                            <td>{prop["code"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["domestic"] ? 'Yes' : 'No'}</td>
                                            <td>{prop["international"] ? 'Yes' : 'No'}</td>
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

export default ListServices;