import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Card, Container, Form, Button } from 'react-bootstrap';
import '../assets/css/style.css'
import Navbars from '../components/Navbars/Navbar';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            fields: {userName: '', password: ''},
            validated: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange = (e) => {
        let fields = this.state.fields;
        fields[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ fields })
    }

    handleOnSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault()
        if (form.checkValidity() === true) {
            //API call to validate user
            fetch(`http://localhost:8082/api/v1/userAccounts/${this.state.fields.userName}/${this.state.fields.password}`, {
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    sessionStorage.setItem('userAccountId', response.obj._id)
                    sessionStorage.setItem('userName', response.obj.userName)
                    console.log('roles', response.obj);
                    sessionStorage.setItem('role', response.obj.roles[0])
                    switch (sessionStorage.getItem('role')) {
                        case "A":
                            this.props.history.push('/admin/designsubmissions')
                          break;
                        case "C":
                            this.props.history.push('/admin/submitdesigns')
                          break;
                        case "W":
                            this.props.history.push('/admin/jobs')
                          break;
                        default:
                            this.props.history.push('/admin/')
                    }
                }else{
                    console.log(response);
                    alert("Invalid Credentials...")
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
            <>
                <Navbars />
                <Container fluid>
                    <div className="center">
                        <Card style={{ width: '22rem' }}>
                            <Card.Header>APOD Portal – rev 0.0.0</Card.Header>
                            <Card.Body>
                                <Form noValidate validated={this.state.validated} onSubmit={(e) => {this.handleOnSubmit(e)}}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" id="userName" name="userName" value={this.state.fields.userName} onChange={(e) => {this.handleOnChange(e)}} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a username.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" id="password" name="password" value={this.state.fields.password} onChange={(e) => {this.handleOnChange(e)}} required/>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Sign In
                                    </Button>
                                </Form>
                            </Card.Body>
                            {/*<Card.Footer>
                                New User?
                                <Button variant="link">Sign Up</Button>
                            </Card.Footer>*/}
                        </Card>
                    </div>
                </Container>
            </>
        )
    }
}

export default withRouter(Login);