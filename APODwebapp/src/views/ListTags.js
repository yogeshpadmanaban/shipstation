import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';

class ListTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListTags: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8082/api/v1/tags/listtags`, '').then(res => {
            console.log("res", res.data.output);
            if (res && res.data && res.data.success) {
                this.setState({ ListTags: res.data.output });
            }
        })
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>List Tags</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>TagId</b></th>
                                        <th><b>Name</b></th>
                                        <th><b>Color</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ListTags.map((prop) => {
                                        return <tr>
                                            <td>{prop["tagId"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["color"]}</td>
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

export default ListTags;