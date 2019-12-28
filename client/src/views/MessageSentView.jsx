import React, { Component } from "react";
import { Positioner, TextStyler } from "./styles/messagesentview";

export default class SentView extends Component {
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
