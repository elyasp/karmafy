import React, { Component } from "react";
import { Link } from "react-router-dom";

import Dropzone from "react-dropzone";
import axios from "axios";
import Map from "./FormMap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const TextStyler = styled.div`
  text-shadow: 1px 1px 9px #000;
  text-align: center;
`;

export default class ItemFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      location: {},
      imageUploaded: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onButtonValueChange = this.onButtonValueChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.mapCoord = this.mapCoord.bind(this);
  }

  onValueChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.onValueChange({
      [name]: value
    });
  }

  mapCoord(point) {
    const name = "location";
    const value = point;
    this.props.onValueChange({
      [name]: value
    });
    console.log(this.state.point);
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

  handleUploadImages = images => {
    const name = "imageUploaded";
    const value = "loading";
    this.props.onValueChange({
      [name]: value
    });

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
          const name = "imageUrl";
          const value = final;
          this.props.onValueChange({
            [name]: value
          });
        });
    });

    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    axios.all(uploads).then(() => {
      const name = "imageUploaded";
      const value = "done";
      this.props.onValueChange({
        [name]: value
      });

      console.log("Images have all being uploaded", uploads);
    });
  };

  render() {
    console.log(this.state.imageUploaded);
    const mapStyles = {
      width: "50%",
      height: "300px",
      display: "block",
      position: "static"
    };
<<<<<<< HEAD
    const containerStyle = { height: "400px", position: "static" };
||||||| merged common ancestors
    const containerStyle = { height: "400px" };
=======
    const containerStyle = { height: "400px", width: "85%" };
>>>>>>> 8d9a4e524a241a483fefe861a284a8ca05bd444c
    return (
      <Form onSubmit={this.onFormSubmit}>
<<<<<<< HEAD
        <h3>Lost Item</h3>
        <h5>
          Lost something? Poor you! Describe it below and redeem your karma
          points.
        </h5>

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
||||||| merged common ancestors
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
=======
        <TextStyler>
          <br />
          <h3>Describe your item below</h3>
          <br />
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h5>What did you lose?</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="e.g. Green Cotton Wallet near Central Park"
              size="md"
              value={this.props.value.title}
              onChange={this.onValueChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              name="description"
              placeholder="Add as much details as you can remember"
              size="md"
              value={this.props.value.description}
              onChange={this.onValueChange}
            />
          </Form.Group>
>>>>>>> 8d9a4e524a241a483fefe861a284a8ca05bd444c

          <Form.Group style={{ height: "400px" }}>
            <Form.Label>
              <h5>
                Click to add a marker near where you think you lost the item.
              </h5>
            </Form.Label>
            <Map
              style={mapStyles}
              updateCoord={this.mapCoord}
              value={this.state.item}
              containerStyle={containerStyle}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Dropzone onDrop={this.handleUploadImages}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <strong>
                    <h4>Click me to upload a picture</h4>
                  </strong>
                </div>
              )}
            </Dropzone>
          </Form.Group>
        </TextStyler>

        {this.props.children}
      </Form>
    );
  }
}
