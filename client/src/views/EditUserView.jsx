import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";

import styled from "styled-components";
import { editUser } from "./../services/authServices";
// import Importer from "./ItemAddView";

/////////////////////// STYLE //////////////////////////

const ViewWrapper = styled.div`
  color: #fff;
  width: 100%;
  height: 100vh;
  padding: 5px;
  background: hsla(254, 100%, 42%, 0.8);
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px;
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  &:hover {
    color: black;
    background: hsla(248, 100%, 50%, 0.659);
  }
`;

///////////////////// END OF STYLE //////////////////////

export default class EditUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.editUser = this.editUser.bind(this);

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
              </ProfileWrapper>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
