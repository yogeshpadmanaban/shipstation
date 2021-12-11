import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../../assets/img/logo.svg';

class Navbars extends Component{
    render(){
        return(
            <>
                <Navbar bg="secondary" variant="light">
                    <Container>
                        <Navbar.Brand>
                            <img
                            alt=""
                            src={Logo}
                            width="70px"
                            height="70px"
                            className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                        {sessionStorage.getItem('userName') ? 
                            <div>
                                Hi, {sessionStorage.getItem('userName') + " "} 
                                <a href="/login/" onClick={() => {sessionStorage.clear()}}>Sign Out</a>
                            </div>
                        :
                            ""}
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default withRouter(Navbars);