import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import { Formik } from "formik";
import Logo from "../images/rabobank-logo.png";
import { Link } from "react-router-dom";
import AuthService from "../Services/auth-service";
import InputValidation from "../input-validation";

class RegisterContainer extends Component {
  state = { loading: false, error: false, redirect: false };
  render() {
    const schema = InputValidation.register;
    let onSubmit = (v) => {
      this.setState({ loading: true });
      AuthService.Register(v.username, v.password, v.email)
        .then(() => {
          this.setState({ loading: false, redirect: true });
        })
        .catch((error) => {
          this.setState({ error: true, loading: false, redirect: false });
        });
    };
    return (
      <Container>
        <h3 className='text-center'>
          <img src={Logo} alt='Rabobank logo' />
        </h3>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
          }}>
          {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className='text-center'>
              {this.state.redirect === true ? (
                <Alert variant='success' className='rabobank-danger-alert'>
                  Successful registration! <br /> You can{" "}
                  <Link className='rabobank-link' to='../login'>
                    login
                  </Link>{" "}
                  with your credentials.
                </Alert>
              ) : this.state.error ? (
                <Alert variant='danger' className='rabobank-danger-alert'>
                  Something went wrong.
                </Alert>
              ) : null}
              <Form.Group className='mb-3' controlId='email-group'>
                <Form.Control
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='username-group'>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={touched.username && !!errors.username}
                  isValid={touched.username && !errors.username}
                />
                <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='password-group'>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='confirm-password-group'>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  name='confirm_password'
                  value={values.confirm_password}
                  onChange={handleChange}
                  isInvalid={touched.confirm_password && errors.confirm_password}
                  isValid={touched.confirm_password && !errors.confirm_password}
                />
                <Form.Control.Feedback type='invalid'>{errors.confirm_password}</Form.Control.Feedback>
              </Form.Group>
              <Button type='submit' className='m-auto rabobank-button mb-3'>
                Submit
              </Button>
              <p className='text-center'>
                Already have an account? Login{" "}
                <Link to='../login' className='rabobank-link'>
                  here
                </Link>
                .
              </p>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}
export default RegisterContainer;
