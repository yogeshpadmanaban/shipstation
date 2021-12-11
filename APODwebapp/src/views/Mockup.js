import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';

class Mockup extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {designSubmissionId: '', userId: '', productId: '', imageDesc: '', file: null},
            errors: {},
            mockups: [],
            validated: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/mockups/`, {
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
                    this.setState({mockups: response.output});
                }else{
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleOnChange = (e) => {
        let fields = this.state.fields;
        fields[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ fields })
    }

    handleOnChangeFile = (e) => {
        console.log(e);
        let fields = this.state.fields;
        fields[e.currentTarget.id] = e.currentTarget.files;
        this.setState({ fields })
    }

    handleOnSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault()
        if (form.checkValidity() === true) {
            //API call to submit designs
            const formData  = new FormData();
            formData.append('file', this.state.fields.file[0]);
            formData.append('designSubmissionId',this.state.fields.designSubmissionId);
            formData.append('userId',this.state.fields.userId);
            formData.append('productId',this.state.fields.productId);
            formData.append('imageDescription',this.state.fields.imageDesc);
            fetch(`http://localhost:8082/api/v1/mockups/`, {
                "method": "POST",
                "body": formData
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    console.log("file uploaded successfully")
                    alert("Mockup image uploaded successfully")
                }else{
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
        this.setState({validated: true})

    }
 
    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>View All Mockups</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Design Submission Id</b></th>
                                        <th><b>Product Id</b></th>
                                        <th><b>User Id</b></th>
                                        <th><b>Image Description</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.mockups.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["designSubmissionId"]}</td>
                                            <td>{prop["productId"]}</td>
                                            <td>{prop["userId"]}</td>
                                            <td>{prop["imageDescription"]}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>      
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Upload Mockups</Card.Title>
                        <Row>
                            <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Design Submission Id</Form.Label>
                                            <Form.Control type="text" placeholder="Enter design submission id" id="designSubmissionId" name="designSubmissionId" value={this.state.fields.designSubmissionId} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a design Submission Id.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>User Id</Form.Label>
                                            <Form.Control type="text" placeholder="Enter user id" id="userId" name="userId" value={this.state.fields.userId} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a user id.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Product Id</Form.Label>
                                            <Form.Control type="text" placeholder="Enter product id" id="productId" name="productId" value={this.state.fields.productId} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a product Id.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Image Description</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Image Description" id="imageDesc" name="imageDesc" value={this.state.fields.imageDesc} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a image description.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Select file</Form.Label>
                                            <Form.Control type="file" id="file" name="file" onChange={(e) => {this.handleOnChangeFile(e)}} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                    <Col md={4}></Col>
                                </Row>
                                <div
                                    style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                    }}
                                >
                                    <Button variant="primary" type="submit">
                                        Upload 
                                    </Button>
                                </div>
                            </Form>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Mockup;