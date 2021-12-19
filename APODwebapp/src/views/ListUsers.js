import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';

class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListCarriers: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8082/api/v1/users/listusers/`, '').then(res => {
            if (res && res.data && res.data.success) {
                this.setState({ ListCarriers: res.data.output });
                console.log("res", res.data.output);
            }
        })
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>List Users</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>userId</b></th>
                                        <th><b>name</b></th>
                                        <th><b>userName</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListCarriers.map((prop) => {
                                        return <tr>
                                            <td>{prop["userId"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["userName"]}</td>
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

export default ListUsers;