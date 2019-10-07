import React, { Component, Fragment } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background: none;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default class NavbarItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="sticky-top" expand="sm">
          <Link to="/" className="btn">
            <h4>KARMAFY</h4>
          </Link>
          {(!this.props.user && (
            <Fragment>
              <Link className="btn" to="/login">
                <h5>Login</h5>
              </Link>
              <Link className="btn" to="/register">
                <h5>Register</h5>
              </Link>
            </Fragment>
          )) || (
            <Fragment>
              <Navbar.Collapse
                className="justify-content-end"
                id="responsive-navbar-nav"
              >
                <Nav>
                  <Link
                    to={`/user/${this.props.user.name}`}
                    className="text-white"
                  >
                    <span className="btn">
                      <h5>Welcome {this.props.user.name}</h5>
                    </span>
                  </Link>
                  <Form onSubmit={this.props.logOut}>
                    <Button type="submit">
                      <img src="./../../logout.png" width="30" height="30" />
                    </Button>
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
