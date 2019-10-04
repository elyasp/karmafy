import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import * as AuthenticationServices from "./../services/authServices";

export default class RegisterView extends Component {
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
    console.log(e.target);
    const name = e.target.name;
    // const email = e.target.email;
    const value = e.target.value;
    this.setState({
      [name]: value
      // [email]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, email, password } = this.state;
    AuthenticationServices.registerService({
      name,
      email,
      password
    })
      .then(() => {
        this.props.history.push("/user");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="registerfields">
        <Form className="registerfields" onSubmit={this.onSubmit}>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onValueChange}
              placeholder="What is your name?"
            />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onValueChange}
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onValueChange}
              placeholder="Choose a password"
            />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}
