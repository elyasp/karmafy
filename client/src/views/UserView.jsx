import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import styled, { keyframes } from "styled-components";

// import Importer from "./ItemAddView";

//////////////////// STYLE //////////////////////
// const change = keyframes`
//  0% {
//       background-position: 0 50%;
//     }
//     50% {
//       background-position: 150% 50%;
//     }
//     100% {
//       background-position: 0 50%;
//     }
// `;

const UserWrapper = styled.div`
  border-top: 10px double white;
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 50px;
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
      <UserWrapper>
        <img />
        <h1>{this.props.user.name}</h1>

        <Button>Found Items</Button>
        <Button>Lost Items</Button>

        <Link to="/all" className="btn">
          <h3>View Items</h3>
        </Link>
      </UserWrapper>
    );
  }
}
