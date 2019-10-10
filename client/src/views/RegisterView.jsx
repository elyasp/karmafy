import React, { Component } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

import * as AuthenticationServices from "./../services/authServices";
import { uploadImage } from "../services/authServices";
import Location from "../components/location";
/////////////// STYLES /////////////////

const Positioner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  margin-top: 40px;

  .entries {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
`;

const Button = styled.button`
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  &:hover {
    color: black;
    background: hsla(59, 100%, 49%, 0.34);
  }
`;

//////////// END OF STYLES //////////////

export default class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      profile: "",
      location: "",
      karmaCount: 0
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.passwordChecker = this.passwordChecker.bind(this);
  }

  onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      imageUploaded: ""
    });
  }

  onLocationChange() {
    console.log(this.props.value);
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, email, password, profile, location, karmaCount } = this.state;
    AuthenticationServices.registerService({
      name,
      email,
      password,
      profile,
      location,
      karmaCount
    })
      .then(user => {
        this.props.loadUser(user);
        this.props.history.push(`/user/${this.state.name}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleFileUpload = e => {
    this.setState({
      imageUploaded: "loading"
    });
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    uploadImage(uploadData)
      .then(response => {
        this.setState({
          profile: response.data.secure_url,
          imageUploaded: "done"
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: position.coords.latitude + "," + position.coords.longitude
        });
      });
    }
  }

  passwordChecker() {
    const button = document.getElementById("regbutton");
    if (
      document.getElementById("register-password").value ===
      document.getElementById("confirm-password").value
    ) {
      document.getElementById("message").style.color = "#b1ff9c";
      document.getElementById("message").innerHTML = "MATCHED";
      button.disabled = false;
      button.style.backgroundColor = "hsla(32, 100%, 50%, 0)";
      if (
        document.getElementById("register-password").value === "" &&
        document.getElementById("confirm-password").value === ""
      ) {
        document.getElementById("message").style.color = "orange";
        document.getElementById("message").innerHTML = "CHOOSE PASSWORD";
      }
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "PASSWORDS NOT MATCHING";
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
  }

  changeLocation(evt) {
    this.setState({
      location: evt.target.value
    });
  }

  render() {
    const isEnabled = this.state.imageUploaded === "loading";
    return (
      <div>
        <Positioner>
          <h3>Join the karma exchange</h3>
          <Form className="entries" onSubmit={this.onSubmit}>
            <input
              className="new-todo none"
              value={this.state.location}
              onChange={evt => this.changeLocation(evt)}
            />
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onValueChange}
                placeholder="What is your name?"
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onValueChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onKeyUp={this.passwordChecker}
                id="register-password"
                value={this.state.password}
                onChange={this.onValueChange}
                placeholder="Choose a password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onKeyUp={this.passwordChecker}
                id="confirm-password"
                placeholder="Make sure it matches"
                required
              />
            </Form.Group>
            <strong>
              <h6 id="message"></h6>
            </strong>

            <Form.Label>Upload A Profile Picture</Form.Label>
            <Form.Group
              className="text-align-center w-75"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                as="input"
                type="file"
                name="imageUrl"
                size="sm"
                className="btn-sm pl-4"
                onChange={e => this.handleFileUpload(e)}
              />
            </Form.Group>

            <Button disabled={isEnabled} type="submit" id="regbutton">
              REGISTER
            </Button>
          </Form>
        </Positioner>
      </div>
    );
  }
}
