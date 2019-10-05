import React, { Component } from "react";

export default class AddFound extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>
            {" "}
            Found something? Get some karma points and add your item here to
            help us return it!
          </h4>
          <Form>
            <Form.Group>
              <Form.Label>What did you find?</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g. size 39 red right shoe"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Add some verification questions</Form.Label>
              <Form.Control as="textarea" rows="4" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Add some pictures</Form.Label>
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
      </div>
    );
  }
}

// MAKE FORM WITH QUESTIONARY FOR FINDER, INCLUDING GMAPS [PINPOINT], UPLOAD, AND SECURITY QUESTIONS
