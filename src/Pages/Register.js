import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import RegisterContainer from "../Containers/register-container";
import Curve from "../Components/curve";

class Register extends Component {
  render() {
    return (
      <>
        <Container className='reg-page' fluid>
          <Row className='d-flex align-items-center justify-content-center reg-row'>
            <Col md={12} lg={5} className='reg-col p-3 '>
              <RegisterContainer />
            </Col>
          </Row>
        </Container>
        <Curve />
      </>
    );
  }
}
export default Register;
