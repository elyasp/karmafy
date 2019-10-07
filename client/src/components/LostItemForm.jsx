import React, { Component } from "react";
import { Link } from "react-router-dom";

import Dropzone from "react-dropzone";
import axios from "axios";

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

  handleUploadImages = images => {
    const final = [];
    // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
    const uploads = images.map(image => {
      // our formdata
      const formData = new FormData();
      formData.append("file", image);
      // formData.append("tags", "{TAGS}"); // Add tags for the images - {Array}
      formData.append("upload_preset", "e3kxwxiy"); // Replace the preset name with your own
      formData.append("api_key", "676778632785877"); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Replace cloudinary upload URL with yours
      return axios
        .post(
          `https://api.cloudinary.com/v1_1/dz3ipymey/image/upload`,
          formData,
          { headers: { "X-Requested-With": "XMLHttpRequest" } }
        )
        .then(response => {
          final.push({ image: response.data.url });
          console.log("this", response.data.url);
          const name = "imageUrl";
          const value = final;
          this.props.onValueChange({
            [name]: value
          });
        });
    });

    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    axios.all(uploads).then(() => {
      // ... do anything after successful upload. You can setState() or save the data
      console.log("Images have all being uploaded", uploads);

      console.log(final);
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

        {/* <Form.Group controlId="exampleForm.ControlInput1">
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
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Where did you lose it?</Form.Label>
          <Form.Text className="text-muted">
            If you can't remember one specific place, widen the searchradius to
            include all the places you've been.
          </Form.Text>
          <h5>"HERE BE GOOGLE MAPS"</h5>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Dropzone onDrop={this.handleUploadImages}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                Click me to upload a file!
              </div>
            )}
          </Dropzone>
        </Form.Group>

        {this.props.children}
      </Form>
    );
  }
}
