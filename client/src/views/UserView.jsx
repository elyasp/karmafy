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
  height: 76.5vh;
  background: hsla(49, 100%, 50%, 0.6);
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  h1 {
    font-weight: 200;
  }
`;

const Button = styled.button`
  margin: 10px;
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  &:hover {
    color: black;
    background: hsla(59, 100%, 49%, 0.34);
  }
`;

const ItemSection = styled.div`
  height: 150vh;
  margin-top: 30px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: #070424;
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
                <Button>
                  <h5>Edit Profile</h5>
                </Button>
              </Link>
              <ProfileWrapper>
                <img src="./../../profilepic.png" width="200" height="200" />
                <h1>{this.props.user.name}</h1>
                <h6>Karmalevel: 0</h6>
              </ProfileWrapper>
              <ItemSection>
                <h4>My various items...</h4>
              </ItemSection>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
