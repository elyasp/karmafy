import React, { Component } from "react";

export default class AddLost extends Component {
  render() {
    return (
      <div>
        <h4>
          {" "}
          Lost something? Poor you! Describe it below and redeem your karma
          points
        </h4>
        <Form>
          <Form.Group>
            <Form.Label>What did you lose?</Form.Label>
            <Form.Control
              type="email"
              placeholder="e.g. Green Cotton Wallet near Central Park"
            />
            <Form.Text className="text-muted">Test text</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Describe your item as specific as possible</Form.Label>
            <Form.Control as="textarea" rows="4" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Do you have any photos? </Form.Label>
            <Form.Text className="text-muted">
              Optional, but it would help a possible finder
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Where did you lose it?</Form.Label>
            <Form.Text className="text-muted">
              If you can't remember one specific place, widen the searchradius
              to include all the places you've been.
            </Form.Text>
            <h5>"HERE BE GOOGLE MAPS"</h5>
          </Form.Group>

          <Button type="submit">Place Item</Button>
        </Form>
      </div>
    );
  }
}

////// ADD FORM FOR LOSER INCLUDING GMAPS RADIUS SELECTOR OR PINPOINT, DESCRIPTION, OPTIONAL PHOTOS,
