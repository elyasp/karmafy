import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//;'[]

export default class ItemFormView extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.onButtonValueChange = this.onButtonValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onValueChange({
      [name]: value
    });
  }

  onButtonValueChange(event) {
    const name = event.target.name;
    const value = event.target.id;
    this.props.onValueChange({
      [name]: value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit();
  }

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Group>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input "
              type="radio"
              name="itemStatus"
              id="Found"
              onChange={this.onButtonValueChange}
            />
            <label className="form-check-label" for="exampleRadios1">
              Found Item
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="itemStatus"
              id="Lost"
              onChange={this.onButtonValueChange}
            />
            <label className="form-check-label" for="exampleRadios2">
              Lost Item
            </label>
          </div>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Post Title"
            value={this.props.value.title}
            onChange={this.onValueChange}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            name="description"
            placeholder="Add a detailed description"
            size="lg"
            value={this.props.value.description}
            onChange={this.onValueChange}
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
            // value={this.props.value.title}
            // onChange={this.onValueChange}
          />
        </Form.Group>
        {this.props.children}
      </Form>
    );
  }
}
