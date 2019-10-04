import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="registerfields">
        <Form className="registerfields">
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              placeholder="What is your name?"
            />
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Choose a password"
            />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}
