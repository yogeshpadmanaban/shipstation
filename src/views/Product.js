import React, { Component } from 'react';
import { Card, Container, Row, Table, Button } from 'react-bootstrap';

class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            products: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/products/`, {
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
                    this.setState({products: response.output});
                }else{
                    console.log(response.err);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        return(
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>View All Products</Card.Title>
                        <Row>
                            <Table striped hover bordered size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Product Family</b></th>
                                        <th><b>Product Name</b></th>
                                        <th><b>Size List</b></th>
                                        <th><b>Mockup List</b></th>
                                        <th><b>Product Code</b></th>
                                        <th><b>Variant Code</b></th>
                                        <th><b>Variant Name</b></th>
                                        <th><b>Variant Value</b></th>
                                        <th><b>Display Name</b></th>
                                        <th><b>Template Id</b></th>
                                        <th><b>Default Price</b></th>
                                        <th><b>Weight</b></th>
                                        <th><b>Cost</b></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.products.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["productFamily"]}</td>
                                            <td>{prop["productName"]}</td>
                                            <td>{prop["sizeList"]}</td>
                                            <td>{prop["mockupList"]}</td>
                                            <td>{prop["productCode"]}</td>
                                            <td>{prop["variantCode"]}</td>
                                            <td>{prop["variantName"]}</td>
                                            <td>{prop["variantValue"]}</td>
                                            <td>{prop["displayName"]}</td>
                                            <td>{prop["templateId"]}</td>
                                            <td>{prop["defaultPrice"]}</td>
                                            <td>{prop["weight"]}</td>
                                            <td>{prop["cost"]}</td>
                                            <td><Button type="button" variant="secondary" size="sm" onClick={() => {}}>Details</Button></td>
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

export default Product;