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

const TextStyler = styled.div`
  text-shadow: 1px 1px 9px #000;
  text-align: center;
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
          <TextStyler>
            <h3> Message Succesfully Sent ! </h3>
          </TextStyler>
        </Positioner>
      </div>
    );
  }
}
