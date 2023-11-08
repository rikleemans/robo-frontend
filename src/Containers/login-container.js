import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import { Formik } from "formik";
import Logo from "../images/rabobank-logo.png";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import UserService from "../Services/user-service";
import AuthService from "../Services/auth-service";
import InputValidation from "../input-validation";

class LoginContainer extends Component {
  state = { loading: true, loggedError: false, redirect: false };
  componentDidMount() {
    UserService.GetUser()
      .then((x) => {
        this.setState({ logged: true, loading: false });
      })
      .catch((x) => {
        this.setState({ logged: false, loading: false });
      });
  }
  onSubmit = (v) => {
    this.setState({ loading: true });
    AuthService.Login(v.username, v.password)
      .then((res) => {
        localStorage.setItem("user", res.data);
        this.setState({ redirect: true, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loggedError: true, loading: false });
      });
  };
  GoogleSuccess = (res) => {
    console.log(res.profileObj);
    AuthService.Login(res.profileObj.name.replace(" ", ""), "Pw" + res.profileObj.googleId + "!")
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", response.data);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  GoogleFail = (e) => {};

  LogoutSuccess = () => {};

  render() {
    const schema = InputValidation.login;

    let { logged, loading, redirect, loggedError } = this.state;

    if (redirect || logged) {
      this.setState({ redirect: false });
      return <Navigate to='/profile'></Navigate>;
    }
    return (
      <Container className='login-container'>
        <h3 className='text-center'>
          <img src={Logo} draggable='false' alt='Rabobank logo' />
        </h3>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            this.onSubmit(values);
          }}
          initialValues={{
            username: "",
            password: "",
          }}>
          {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className='text-center'>
              {loggedError === true ? (
                <Alert variant='danger' className='rabobank-danger-alert'>
                  Wrong username or password!
                </Alert>
              ) : (
                ""
              )}
              <Form.Group className='mb-3' controlId='username-group'>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  name='username'
                  className='input-username'
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='password-group'>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  name='password'
                  className='input-password'
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
              </Form.Group>
              {loggedError === true ? (
                <p className='forgot-password text-end'>
                  Forgot your password? Click <button className='rabobank-link'>here</button>.
                </p>
              ) : (
                ""
              )}
              <div className='button-container'>
                <Button
                  type='submit'
                  className={loggedError ? "m-auto rabobank-button mb-3 bounce" : "m-auto rabobank-button mb-3"}
                  disabled={loading}>
                  {loading ? <div className='loader'></div> : "Login"}
                </Button>

                <GoogleLogin
                  clientId='468067087468-m53ggr2taihuh15tb4s2akebrbmtn82h.apps.googleusercontent.com'
                  buttonText='Login'
                  className='google-button'
                  onSuccess={this.GoogleSuccess}
                  onFailure={this.GoogleFail}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <p className='text-center'>
                Don't have an account? Register one {""}
                <Link to='../register' className='rabobank-link'>
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
export default LoginContainer;
