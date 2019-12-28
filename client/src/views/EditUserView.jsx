import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";
import { editUser, removeUser } from "./../services/authServices";
import { ViewWrapper, ProfileWrapper, Button } from "./styles/edituserview.js";

export default class EditUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  editUser(event) {
    event.preventDefault();
    const name = this.state.name;
    const id = this.props.user._id;

    editUser(name, id)
      .then(user => {
        this.props.history.push(`/user/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteUser() {
    console.log(this.props.history);
    removeUser(this.props.user._id)
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  }

  onValueChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div>
        {(this.props.user && (
          <div>
            <ViewWrapper>
              <Link to={`/user/${this.props.user._id}`}>
                <Button>
                  <h1>↩</h1>{" "}
                </Button>
              </Link>

              <ProfileWrapper>
                <Form onSubmit={this.editUser}>
                  <h6>Change Public Name</h6>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="e.g. karma99"
                      onChange={this.onValueChange}
                    />
                    <Form.Text className="text-muted">
                      your name is {this.props.user.name}
                    </Form.Text>
                  </Form.Group>

                  <h6>Change Password</h6>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      name="name"
                      placeholder="currently unavailable"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      name="name"
                      placeholder="currently unavailable"
                      disabled
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Form>
                {/* <Button variant="outline-danger" onClick={this.deleteUser}>
                  Delete
                </Button> */}
              </ProfileWrapper>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
