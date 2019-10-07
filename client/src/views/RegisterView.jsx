import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

import * as AuthenticationServices from "./../services/authServices";

/////////////// STYLES /////////////////

const Positioner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
    background: white;
  }
`;

//////////// END OF STYLES //////////////

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
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, email, password } = this.state;
    console.log(name, email, password);
    AuthenticationServices.registerService({
      name,
      email,
      password
    })
      .then(user => {
        this.props.loadUser(user);
        this.props.history.push(`/user/${this.state.name}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Positioner>
          <h3>Join the karma exchange</h3>
          <Form className="entries" onSubmit={this.onSubmit}>
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
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onValueChange}
                placeholder="Make sure it matches"
              />
            </Form.Group>
            <Button type="submit">REGISTER</Button>
          </Form>
        </Positioner>
      </div>
    );
  }
}
