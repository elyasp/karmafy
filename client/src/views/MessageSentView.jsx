import React, { Component } from "react";

import styled from "styled-components";

/////////////// STYLES /////////////////

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export default class SentView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Positioner>
          <h3>Message Succesfully Sent ! </h3>
        </Positioner>
      </div>
    );
  }
}
