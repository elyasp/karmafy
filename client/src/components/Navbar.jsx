import React, { Component, Fragment } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import ItemAddView from "./../views/ItemAddView";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

/////////////////////////// STYLE //////////////////////

const Button = styled.button`
  border: none;
  background: none;
`;

const AddButton = styled.button`
  border: 0.5px solid #fff1c4;
  border-radius: 3px;
  display: flex;
  justify-self: center;
  font-size: 20px;
  background: none;
  color: #fff1c4;
  &:hover {
    background: hsla(59, 100%, 49%, 0.34);
    color: black;
    text-decoration: none;
  }
`;

////////////////////// END OF STYLE ///////////////////////

export default class NavbarItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="sticky-top" expand="sm">
          <Link to="/" className="btn">
            <h4 className="title">KARMAFY</h4>
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
                  <Link to="/item/add">
                    <AddButton> ADD OBJECT </AddButton>
                  </Link>
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
                      <img src="./../../logout.png" width="30" height="35" />
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
