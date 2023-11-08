import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

class AboutUs extends Component {
  render() {
    return (
      <div>
        {/* <NavbarComponent /> */}
        <Container fluid className='mt-5 pb-5 page about-us-page'>
          <Row className='align-items-center justify-content-md-center aboutus-row'>
            <Col md={12} lg={10} className='aboutus-col p-3'>
              <h3 className='text-center' id='aboutus-title'>
                Our team
              </h3>
              <Table striped bordered hover variant='light'>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Scrum Master</td>
                    <td>Rik</td>
                    <td>Leemans</td>
                  </tr>
                  <tr>
                    <td>Back-End</td>
                    <td>Elisa</td>
                    <td>Gonzalez Asensio</td>
                  </tr>
                  <tr>
                    <td>Back-End</td>
                    <td>Kees</td>
                    <td>Elsman</td>
                  </tr>
                  <tr>
                    <td>Back-End</td>
                    <td>Ming</td>
                    <td>Janssen</td>
                  </tr>
                  <tr>
                    <td>Front-End</td>
                    <td>Artem</td>
                    <td>Stolbchenko</td>
                  </tr>
                  <tr>
                    <td>Front-End</td>
                    <td>Alex</td>
                    <td>Svetoslavov</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default AboutUs;
