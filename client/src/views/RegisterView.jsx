import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Username" name="username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Campus</Form.Label>
            <Form.Control as="select" placeholder="Campus" name="campus">
              <option value="" disabled>
                Choose a Campus
              </option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Course</Form.Label>
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    );
  }
}
