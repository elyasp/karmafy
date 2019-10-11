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
      password: "",
      loginError: false
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.loginError = this.loginError.bind(this);
  }

  onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  loginError() {
    this.setState({
      loginError: true
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
        this.props.history.push(`/`);
      })
      .catch(error => {
        this.loginError();
      });
  }

  render() {
    return (
      <div>
        <Positioner>
          {this.state.loginError && <h4>Incorrect username or password</h4>}

          <Form onSubmit={this.onSubmit} className="entries">
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                required
                value={this.state.email}
                onChange={this.onValueChange}
              />
              <Form.Text>
                <small>Your e-mail is safe with us</small>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
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
