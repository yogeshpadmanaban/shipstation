import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';

class ListPackages extends Component{
    constructor(props){
        super(props);
        this.state = {
            ListPackages: []
        }
    }

    componentDidMount(){
        axios.post(`http://localhost:8082/api/v1/carriers/listpackages?carrierCode=stamps_com`, '').then(res => {
            if(res && res.data && res.data.success) {
                this.setState({ListPackages: res.data.output});
                console.log("res", res.data.output);
            }
      })
    }
 
    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>List Packages</Card.Title>
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
                                    {this.state.ListPackages.map((prop) => {
                                        return <tr>
                                            <td>{prop["carrierCode"]}</td>
                                            <td>{prop["code"]}</td>
                                            <td>{prop["name"]}</td>
                                            <td>{prop["domestic"]}</td>
                                            <td>{prop["international"]}</td>
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

export default ListPackages;