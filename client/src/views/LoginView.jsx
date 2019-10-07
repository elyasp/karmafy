import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

import * as AuthenticationServices from "./../services/authServices";

/////////////// STYLES /////////////////

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  margin-top: 40px;

  .entries {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
`;

const Button = styled.button`
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  &:hover {
    color: black;
    background: hsla(59, 100%, 49%, 0.34);
  }
`;

//////////// END OF STYLES //////////////

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    AuthenticationServices.logInService({
      email,
      password
    })
      .then(user => {
        this.props.loadUser(user);
        this.props.history.push(`/all`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Positioner>
          <h3>Log In</h3>

          <Form onSubmit={this.onSubmit} className="entries">
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onValueChange}
              />
              <Form.Text className="text-muted">
                Your e-mail is safe with us
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onValueChange}
              />
            </Form.Group>
            <Button className="button" variant="primary" type="submit">
              LOG IN
            </Button>
          </Form>
        </Positioner>
      </div>
    );
  }
}
