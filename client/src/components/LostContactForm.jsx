import React, { Component, Fragment } from "react";
import { Card, Form } from "react-bootstrap";

import styled from "styled-components";

///////////////// STYLE /////////////////////

const Button = styled.button`
  color: white;
  display: block;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  margin: 0 auto;
  &:hover {
    color: black;
    background: hsla(360, 100%, 49%, 0.34);
  }
`;

const TextStyler = styled.div`
  text-shadow: 1px 1px 9px #000;
  text-align: center;
  margin-bottom: 10vh;
`;

//////////////////// END OF STYLE //////////

export default class LostContactForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Fragment>
          <TextStyler>
            <h2 className="mb-4">Item yours? Contact the finder</h2>
            <Form onSubmit={this.props.form}>
              <Form.Group>
                <Form.Label htmlFor="email" className="h4">
                  Your Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  onChange={this.props.change}
                />
                <Form.Text>
                  <p>You will be replied to this address</p>
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="contactnumber" className="h4">
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
                <Form.Label htmlFor="ownerCheck" className="h4">
                  {this.props.check}{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="ownerCheckAns"
                  placeholder="answer verification question above"
                  onChange={this.props.change}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="h4" htmlFor="message">
                  Message
                </Form.Label>
                <Form.Control
                  onChange={this.props.change}
                  as="textarea"
                  name="message"
                  rows="6"
                  placeholder="Be sure to include as much details as you can remember (tip: offer a reward)"
                />
              </Form.Group>
              <Button className="mb-4" type="submit">
                Send Message
              </Button>
            </Form>
          </TextStyler>
        </Fragment>
      </div>
    );
  }
}
