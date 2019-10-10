import React, { Component, Fragment } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import ItemAddView from "./../views/ItemAddView";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

/////////////////////////// STYLE //////////////////////

////////////////////// END OF STYLE ///////////////////////

export default class NavbarItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="sticky-top" expand="md">
          <Link to="/" className="btn">
            <h4 className="title">KARMAFY</h4>
          </Link>

          {(!this.props.user && (
            <Fragment>
              <div>
                <Link className="btn auth" to="/login">
                  <h5>Login</h5>
                </Link>
                <Link className="btn auth" to="/register">
                  <h5>Register</h5>
                </Link>
              </div>
            </Fragment>
          )) || (
            <Fragment>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                className="justify-content-end"
                id="responsive-navbar-nav"
              >
                <Nav>
                  <Link
                    to={`/user/${this.props.user._id}`}
                    className="welcomebutton"
                  >
                    Hello <strong>{this.props.user.name}</strong>
                  </Link>

                  <button className="addbutton">
                    <Link to="/item/add" className="addlink">
                      ADD OBJECT
                    </Link>
                  </button>

                  <Form onSubmit={this.props.logOut}>
                    <button type="submit" className="logoutbutton">
                      LOG OUT
                    </button>
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
