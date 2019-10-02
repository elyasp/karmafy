import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class ItemAddView extends Component {
  render() {
    return (
      <div className="mt-5 w-75 mx-auto">
        <h1 className="my-5 text-center">Add Item</h1>
        <Form>
          <Form.Group>
            <div class="form-check form-check-inline">
              <Form.Check
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                label="Lost Item"
              />
            </div>
            <div class="form-check form-check-inline">
              <Form.Check
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                label="Found Item"
              />
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter a descriptive title"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="Add a detailed description"
              size="lg"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Upload Your Images</Form.Label>
            <Form.Control
              as="input"
              type="file"
              name="file"
              size="lg"
              className="btn-lg pl-0"
            />
          </Form.Group>
          <Button
            className="mx-auto btn-lg d-block text-center"
            variant="danger"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
