import React, { Component } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import * as AuthenticationServices from "./../services/authServices";

export default class NavbarItem extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    AuthenticationServices.logOutService({})
      .then(() => {
        console.log("PROPS", this.props);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("FAILED", error);
      });
  }

  render() {
    return (
      <Navbar className="sticky-top" bg="dark" expand="lg">
        <Link to="/" className="mr-auto text-white">
          Home
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="text-white"
        />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="">
            <Link to="/user" className="text-white">
              Dashboard
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
            <Link to="/login" className="text-white">
              Login
            </Link>
            <Form onSubmit={this.onSubmit}>
              <Button type="submit">Log Out</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
