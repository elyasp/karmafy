import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";
import EditUserView from "./EditUserView";

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

export default class UserView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {(this.props.user && (
          <div>
            <ViewWrapper>
              <Link to={`${this.props.user.name}/edit`}>
                <Button>Edit Profile</Button>
              </Link>
              <ProfileWrapper>
                <img src="./../../profilepic.png" width="200" height="200" />
                <h1>{this.props.user.name}</h1>
                <h6>Karmalevel: 0</h6>
              </ProfileWrapper>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
