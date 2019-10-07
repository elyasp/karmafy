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
        <h1>Found Item</h1>
        <h4>
          Found something? Get some karma points and add your item here to help
          us return it!
        </h4>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What Did You Find?</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="e.g. size 39 red right shoe"
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
            placeholder="Add a detailed description"
            size="lg"
            value={this.props.value.description}
            onChange={this.onValueChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Verification Questions</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            size="lg"
            placeholder="Add some verification questions"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Upload An Image</Form.Label>
          <Form.Control
            as="input"
            type="file"
            name="imageUrl"
            size="lg"
            className="btn-lg pl-0"
            onChange={e => this.handleFileUpload(e)}
          />
        </Form.Group>
        {this.props.children}
      </Form>
    );
  }
}
