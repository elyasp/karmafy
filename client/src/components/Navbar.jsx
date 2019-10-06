import React, { Component, Fragment } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import * as AuthenticationServices from "./../services/authServices";

export default class NavbarItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="sticky-top" bg="light" expand="lg">
          <Link to="/" className="btn">
            Home
          </Link>
          {(!this.props.user && (
            <Fragment>
              <Link className="btn" to="/login">
                Login
              </Link>
              <Link className="btn" to="/register">
                Register
              </Link>
            </Fragment>
          )) || (
            <Fragment>
              <Navbar.Collapse
                className="justify-content-end"
                id="basic-navbar-nav"
              >
                <Nav className="">
                  <Link
                    to={`/user/${this.props.user.name}`}
                    className="text-white"
                  >
                    <span className="btn">
                      Welcome {this.props.user && this.props.user.name}
                    </span>
                  </Link>
                  <Form onSubmit={this.props.logOut}>
                    <Button type="submit">Log Out</Button>
                  </Form>
                </Nav>
              </Navbar.Collapse>
            </Fragment>
          )}
        </Navbar>
      </div>
    );
  }
}
