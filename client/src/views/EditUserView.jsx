import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";

import styled from "styled-components";

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
    background: white;
  }
`;

///////////////////// END OF STYLE //////////////////////

export default class EditUserView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {(this.props.user && (
          <div>
            <ViewWrapper>
              <Link to={`/user/${this.props.user.name}`}>
                <Button>
                  <h1>↩</h1>{" "}
                </Button>
              </Link>

              <ProfileWrapper>
                <Form>
                  <h6>Change Public Name</h6>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="e.g. karma99"
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
