import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uploadImage } from "../services/itemApi";

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

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    uploadImage(uploadData)
      .then(response => {
        const name = "imageUrl";
        const value = response.data.secure_url;
        this.props.onValueChange({
          [name]: value
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <h1>Lost Item</h1>
        <h4>
          Lost something? Poor you! Describe it below and redeem your karma
          points.
        </h4>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What did you lose?</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="e.g. Green Cotton Wallet near Central Park"
            size="lg"
            value={this.props.value.title}
            onChange={this.onValueChange}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            name="description"
            placeholder="Add as much detail as you can"
            size="lg"
            value={this.props.value.description}
            onChange={this.onValueChange}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>
            Upload An Image Optional, but it would help a possible finder
          </Form.Label>
          <Form.Control
            as="input"
            type="file"
            name="imageUrl"
            size="lg"
            className="btn-lg pl-0"
            onChange={e => this.handleFileUpload(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Where did you lose it?</Form.Label>
          <Form.Text className="text-muted">
            If you can't remember one specific place, widen the searchradius to
            include all the places you've been.
          </Form.Text>
          <h5>"HERE BE GOOGLE MAPS"</h5>
        </Form.Group>

        {this.props.children}
      </Form>
    );
  }
}
