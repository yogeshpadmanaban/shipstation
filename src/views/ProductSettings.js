import React, { Component } from 'react';
import { Card, Container, Row, Table } from 'react-bootstrap';

class ProductSettings extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {designSubmissionId: '', userId: '', productId: '', imageDesc: '', file: null},
            errors: {},
            productSettings: [],
            validated: false
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8082/api/v1/productlistingsettings/useraccount/${sessionStorage.getItem('userAccountId')}`, {
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
                    this.setState({productSettings: response.output});
                }else{
                    console.log(response);
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
                        <Card.Title>View My ProductSettings</Card.Title>
                        <Row>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Id</b></th>
                                        <th><b>Product Id</b></th>
                                        <th><b>Price</b></th>
                                        <th><b>Product Tags List</b></th>
                                        <th><b>Product HTML</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.productSettings.map((prop) => {
                                        return <tr>
                                            <td>{prop["_id"]}</td>
                                            <td>{prop["productId"]}</td>
                                            <td>{prop["price"]}</td>
                                            <td>{prop["productTagsList"]}</td>
                                            <td>{prop["productHtml"]}</td>
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

export default ProductSettings;