import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import LoginContainer from "../Containers/login-container";
import Curve from "../Components/curve";

class Login extends Component {
  render() {
    return (
      <>
        <Container className='login-page' fluid>
          <Row className='d-flex align-items-center justify-content-center login-row'>
            <Col md={12} lg={10} className='login-col p-3 '>
              <LoginContainer />
            </Col>
          </Row>
        </Container>
        <Curve />
      </>
    );
  }
}
export default Login;
