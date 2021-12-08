import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap';

class SubmitDesigns extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {title: '', templateId: '', designCode: '', productId: '', file: null},
            errors: {},
            designSubmissionsByUserId: [],
            validated: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/designsubmissions/useraccount/${sessionStorage.getItem('userAccountId')}`, {
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
                    if(response.output){
                        this.setState({designSubmissionsByUserId: response.output});
                        console.log(this.state.designSubmissionsByUserId.length);
                    }
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
            formData.append('userAccountId', sessionStorage.getItem('userAccountId'));
            formData.append('title',this.state.fields.title);
            formData.append('templateId',this.state.fields.templateId);
            formData.append('designCode',this.state.fields.designCode);
            formData.append('productId',this.state.fields.productId);
            fetch(`http://localhost:8082/api/v1/designsubmissions/`, {
                "method": "POST",
                "body": formData
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    console.log("file uploaded successfully")
                    alert("Design file uploaded successfully")
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
                {
                    this.state.designSubmissionsByUserId.length > 0 ? 
                        <Card>
                            <Card.Body>
                                <Card.Title>View My Design Submissions</Card.Title>
                                <Row>
                                    <Table striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th><b>Id</b></th>
                                                <th><b>UserId</b></th>
                                                <th><b>Title</b></th>
                                                <th><b>TemplateId</b></th>
                                                <th><b>ProductIdArray</b></th>
                                                <th><b>DesignCode</b></th>
                                                <th><b>Status</b></th>
                                                <th><b>Update</b></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.designSubmissionsByUserId.map((prop) => {
                                                return <tr>
                                                    <td>{prop["_id"]}</td>
                                                    <td>{prop["userAccountId"]}</td>
                                                    <td>{prop["title"]}</td>
                                                    <td>{prop["templateId"]}</td>
                                                    <td>{prop["productIdArray"]}</td>
                                                    <td>{prop["designCode"]}</td>
                                                    <td>{prop["status"]}</td>
                                                    <td><Button>Update</Button></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>      
                                </Row>
                            </Card.Body>
                        </Card>
                    :
                        <></>
                }
                <Card>
                    <Card.Body>
                        <Card.Title>Submit Designs</Card.Title>
                        <Row>
                            <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" placeholder="Enter title" id="title" name="title" value={this.state.fields.title} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a title.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Template Id</Form.Label>
                                            <Form.Control type="text" placeholder="Enter template id" id="templateId" name="templateId" value={this.state.fields.templateId} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a template id.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Product Id</Form.Label>
                                            <Form.Control type="text" placeholder="Product Id" id="productId" name="productId" value={this.state.fields.productId} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter productId.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Design Code</Form.Label>
                                            <Form.Control type="text" placeholder="Design Code" id="designCode" name="designCode" value={this.state.fields.designCode} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a DesignCode.
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
                                        Submit 
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

export default SubmitDesigns;