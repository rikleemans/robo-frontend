import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, Link } from "react-router-dom";
import UserService from "../Services/user-service";
import UserSearchService from "../Services/user-search-service";
import AuthService from "../Services/auth-service";
import Select from "react-select";
import { Thumbs } from "react-responsive-carousel";

class NavbarComponent extends Component {
  state = { logout: false, users: [{}] };
  constructor(props) {
    super(props);
    console.log("are de de?", props.onUserChange);
    this.target = React.createRef(null);
    this.searchForUser = this.searchForUser.bind(this);
  }
  componentDidMount() {
    UserService.GetUser()
      .then((x) => {
        this.setState({ logout: false });
      })
      .catch((x) => {
        this.setState({ logout: true });
      });
  }
  searchForUser(e) {
    console.log(e, "pleasee");
    if (e != "") {
      let request = UserSearchService.GetById(e);
      request.then((data) => {
        if (data != null) this.setState({ users: data });
      });
    }
  }
  DisplayUser(e) {
    this.props.onUserChange(e);
    // console.log(e, "test?");
  }
  render() {
    let { logout } = this.state;
    if (logout) {
      return null;
    }
    console.log(this.state);
    const options = this.state.users.map((user, index) => {
      return {
        label: user.name,
        value: user.name,
        key: index,
      };
    });
    return (
      <>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' {...this.props}>
          <Container>
            <Navbar.Brand style={{ cursor: "default" }}>Rabobank</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='nav-links me-auto'>
                <a className='rabobank-link' href='#aboutus-title'>
                  Our Team
                </a>
              </Nav>
              <Nav className='me-auto '>
                <Select
                  onInputChange={this.searchForUser}
                  placeholder='Search for a user'
                  className='UserSearch-bar'
                  classNamePrefix='UserSearch-bar'
                  options={options}
                  onChange={this.DisplayUser.bind(this)}
                />
              </Nav>
              <Nav>
                <NavDropdown title='Profile' id='collasible-nav-dropdown'>
                  <NavDropdown.Item>
                    <NavLink to='../profile' className='rabobank-link'>
                      Your Profile
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={AuthService.Logout}>
                    <NavLink to='../login' className='rabobank-link'>
                      Log out
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default NavbarComponent;
