import React, { Component, Fragment } from "react";
import { Card, Form } from "react-bootstrap";

import styled from "styled-components";

///////////////// STYLE /////////////////////

const Button = styled.button`
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  margin-right: 30px;
  &:hover {
    color: black;
    background: hsla(360, 100%, 49%, 0.34);
  }
`;

//////////////////// END OF STYLE //////////

export default class FoundContactForm extends Component {
  render() {
    return (
      <Fragment>
        <h2>Found this? Upgrade your karma and return it!</h2>
        <Form onSubmit={this.props.form}>
          <Form.Group>
            <Form.Label htmlFor="email">Your Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              onChange={this.props.change}
            />
            <Form.Text>
              <small>You will be replied to this address</small>
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="contactnumber">
              Add your phone number
            </Form.Label>
            <Form.Control
              type="text"
              name="contactnumber"
              placeholder="optional"
              onChange={this.props.change}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="message">Message</Form.Label>
            <Form.Control
              onChange={this.props.change}
              as="textarea"
              name="message"
              rows="3"
            />
          </Form.Group>
          <Button type="submit">Send Message</Button>
        </Form>
      </Fragment>
    );
  }
}