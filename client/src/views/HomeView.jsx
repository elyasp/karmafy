import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

export default class HomeView extends Component {
  render() {
    return (
      <Link className="container mx-auto text-center">
        <h1 className="text-center">Lost and Found</h1>
        <Link>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Found</Nav.Link>
              <Nav.Link href="#features">Lost</Nav.Link>
              <Nav.Link href="#pricing">My Profile</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          <Link to="/login" className="btn">
            <h3>Log In</h3>
          </Link>
          <Link to="/register" className="btn">
            <h3>Register</h3>
          </Link>
        </Link>
      </Link>
    );
  }
}
