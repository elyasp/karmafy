import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";

import styled from "styled-components";

// import Importer from "./ItemAddView";

//////////////////// STYLE //////////////////////

const ViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100%;
  height: 100vh;
  padding: 10px;
  background: hsla(254, 100%, 42%, 0.8);
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 20px;
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
              <ProfileWrapper>
                <img src="./../../profilepic.png" width="200" height="200" />
                <h1>{this.props.user.name}</h1>
              </ProfileWrapper>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
