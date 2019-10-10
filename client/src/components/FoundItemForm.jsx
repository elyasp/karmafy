import React, { Component } from "react";
import { Link } from "react-router-dom";

import Dropzone from "react-dropzone";
import axios from "axios";
import Map from "./FormMap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uploadImage } from "../services/itemApi";
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
    this.handleUploadImages = this.handleUploadImages.bind(this);
    this.onPreviewDrop = this.onPreviewDrop.bind(this);
    this.mapCoord = this.mapCoord.bind(this);
  }

  onPreviewDrop = files => {
    this.setState({
      files: this.state.files.concat(files)
    });
  };

  mapCoord(point) {
    const name = "location";
    const value = point;
    this.props.onValueChange({
      [name]: value
    });
    console.log(this.state.point);
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
          `https://api.cloudinary.com/v1_1/dz3ipymey/image/upload/`,
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
      // ... do anything after successful upload. You can setState() or save the data
      console.log("Images have all uploaded", uploads);
    });
  };

  render() {
<<<<<<< HEAD
    const containerStyle = { height: "300px", position: "static" };
||||||| merged common ancestors
    const mapStyles = {
      width: "20px",
      height: "300px",
      display: "block",
      position: "static"
    };
    const containerStyle = { height: "300px" };
=======
    const mapStyles = {
      width: "20px",
      height: "300px",
      display: "block",
      position: "static"
    };
    const containerStyle = { height: "300px", width: "85%" };
>>>>>>> 8d9a4e524a241a483fefe861a284a8ca05bd444c

    return (
      <Form onSubmit={this.onFormSubmit}>
<<<<<<< HEAD
        <h3>Found Item</h3>
        <h5>
          Found something? Get some karma points and add your item here to help
          us return it!
        </h5>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What Did You Find?</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="e.g. black hat"
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
            placeholder="Add a general description"
            size="lg"
            value={this.props.value.description}
            onChange={this.onValueChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Proof of Ownership question</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            size="sm"
            name="ownerCheck"
            required
            maxlength="120"
            value={this.props.value.ownerCheck}
            onChange={this.onValueChange}
            placeholder="Ask about any special characteristics of the item (i.e. brand, inner-details, size). Max 120 characters"
          />
          <small>
            HINT: Dont ask anything that you put in the description!
          </small>
        </Form.Group>

        <Form.Group style={{ height: "400px", margin: "0 auto" }}>
          <Form.Label>
            Click to add a marker near where you found the item.
          </Form.Label>
          <Map
            className="mx-auto"
            style={{ margin: "0 auto" }}
            updateCoord={this.mapCoord}
            value={this.state.item}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Dropzone onDrop={this.handleUploadImages}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive
                  ? "Drop it like it's hot!"
                  : "Click me or drag a file to upload!"}
              </div>
            )}
          </Dropzone>
        </Form.Group>
||||||| merged common ancestors
        <h3>Found Item</h3>
        <h5>
          Found something? Get some karma points and add your item here to help
          us return it!
        </h5>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What Did You Find?</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="e.g. black hat"
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
            placeholder="Add a general description"
            size="lg"
            value={this.props.value.description}
            onChange={this.onValueChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Proof of Ownership question</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            size="sm"
            name="ownerCheck"
            required
            maxlength="120"
            value={this.props.value.ownerCheck}
            onChange={this.onValueChange}
            placeholder="Ask about any special characteristics of the item (i.e. brand, inner-details, size). Max 120 characters"
          />
          <small>
            HINT: Dont ask anything that you put in the description!
          </small>
        </Form.Group>

        <Form.Group style={{ height: "400px" }}>
          <Form.Label>
            Click to add a marker near where you found the item.
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
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive
                  ? "Drop it like it's hot!"
                  : "Click me or drag a file to upload!"}
              </div>
            )}
          </Dropzone>
        </Form.Group>
=======
        <TextStyler>
          <br />
          <h3>
            Found something? Level up your karma and add the item here to help
            us return it!
          </h3>
          <br />
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h5>What Did You Find?</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="e.g. black hat"
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
              placeholder="Add a general description"
              size="md"
              value={this.props.value.description}
              onChange={this.onValueChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Proof of Ownership question</h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              size="sm"
              name="ownerCheck"
              required
              maxlength="120"
              value={this.props.value.ownerCheck}
              onChange={this.onValueChange}
              placeholder="Ask about any special characteristics of the item (i.e. brand, inner-details, size). Max 120 characters"
            />
            <small>
              HINT: Dont ask anything that you put in the description!
            </small>
          </Form.Group>
          <br />
          <Form.Group style={{ height: "400px" }}>
            <Form.Label>
              <h5>Click to add a marker near where you found the item.</h5>
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
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive
                    ? "Drop it like it's hot!"
                    : "Click me or drag a picture to upload!"}
                </div>
              )}
            </Dropzone>
          </Form.Group>
        </TextStyler>
>>>>>>> 8d9a4e524a241a483fefe861a284a8ca05bd444c

        {this.props.children}
      </Form>
    );
  }
}
