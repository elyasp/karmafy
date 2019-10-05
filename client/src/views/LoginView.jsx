import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import * as AuthenticationServices from "./../services/authServices";

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.props.history.push("/user");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onValueChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
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
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}
