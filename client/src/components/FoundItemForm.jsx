import React, { Component } from "react";
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
      imageStatus: "Click to upload images"
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

  componentDidUpdate(prevProps, prevState) {
    // if (this.props !== prevProps) {
    //   this.setState({
    //     locations: this.props.items
    //   });
    // }
  }

  mapCoord(point) {
    const name = "location";
    const value = point;
    this.props.onValueChange({
      [name]: value
    });
    console.log(this.state.point);
  }

  onValueChange(event) {
    console.log("upevent", event);
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
    this.setState({
      imageStatus: "Loading..."
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
      this.setState({
        imageStatus: "Done"
      });
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
    const mapStyles = {
      width: "80%",
      height: "300px",
      display: "block",
      position: "static"
    };

    const containerStyle = { height: "300px", width: "80%" };
    return (
      <Form onSubmit={this.onFormSubmit}>
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
          <Form.Group style={{ height: "400px", textAlign: "center" }}>
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

          <Form.Group
            className="mt-5 border rounded-lg h5 p-2"
            controlId="exampleForm.ControlInput1"
          >
            <Dropzone onDrop={this.handleUploadImages}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <strong>
                    <h4>{this.state.imageStatus}</h4>
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
