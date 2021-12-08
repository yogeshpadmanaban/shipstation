import React, { Component } from 'react';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class CreateUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {userName:'', email:'', password:'', confirmPassword:'', designIdPrefix:'', designIdOffset:'', roles:[]},
            errors: {},
            action: this.props.location.state.action
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount(){
        if(this.state.action === 'Update'){
            //API call to validate user
            fetch(`http://localhost:8082/api/v1/userAccounts/${this.props.location.state.id}`, {
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    let fields = this.state.fields;
                    fields['userName'] = response.output.userName;
                    fields['email'] = response.output.emailAddress;
                    fields['designIdPrefix'] = response.output.designIdPrefix;
                    fields['designIdOffset'] = response.output.designIdOffset;
                    fields['roles'] = response.output.roles;
                    this.setState({fields});
                }else{
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    handleOnChange = (e) => {

    }

    handleOnSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>{this.state.action} User</Card.Title>
                        <Row>
                            <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Enter username" id="userName" name="userName" value={this.state.fields.userName} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a username.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="email" id="email" name="email" value={this.state.fields.email} onChange={(e) => {this.handleOnChange(e)}} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a email address.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>
                                {this.state.action === "Create" ? 
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" id="password" name="password" value={this.state.fields.password} onChange={(e) => {this.handleOnChange(e)}} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter a password.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" value={this.state.fields.confirmPassword} onChange={(e) => {this.handleOnChange(e)}} required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter a password.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}></Col>
                                    </Row>
                                :
                                    <></>
                                }
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Design Id Prefix</Form.Label>
                                            <Form.Control type="text" id="designIdPrefix" name="designIdPrefix" value={this.state.fields.designIdPrefix} onChange={(e) => {this.handleOnChange(e)}}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Design Id Offset</Form.Label>
                                            <Form.Control type="text" id="designIdOffset" name="designIdOffset" value={this.state.fields.designIdOffset} onChange={(e) => {this.handleOnChange(e)}}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Roles</Form.Label>
                                            <Form.Select multiple aria-label="Default select example" value={this.state.fields.roles}>
                                                <option value="A">Admin</option>
                                                <option value="C">Customer</option>
                                                <option value="W">Worker</option>
                                            </Form.Select>
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
                                        {this.state.action} 
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

export default withRouter(CreateUser);