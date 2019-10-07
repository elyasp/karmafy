import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";

import styled from "styled-components";

// import Importer from "./ItemAddView";

//////////////////// STYLE //////////////////////

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

////////////////////////////////////////////////////

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
              <Button>Edit Profile</Button>
              <ProfileWrapper>
                <h4>Name</h4>
                <h4>Email</h4>
                <h4>Change Password</h4>
              </ProfileWrapper>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
