import React, { Component, Fragment } from "react";
import { Form } from "react-bootstrap";
import { Button, TextStyler } from "./styles/lostcontactform";

export default class LostContactForm extends Component {
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
