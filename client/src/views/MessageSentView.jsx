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
          <h3> Message Succesfully Sent ! </h3>
        </Positioner>
      </div>
    );
  }
}
