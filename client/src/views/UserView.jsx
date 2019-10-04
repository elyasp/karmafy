import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "{this.state.name34}" //test, change later
    };
  }

  render() {
    return (
      <div>
        <h1>Hi there {this.state.name} </h1>
        <h3> Toggle between loser and founder above</h3>

        <h2>Or view some items here</h2>

        <Link to="/item" className="btn">
          <h3>Item</h3>
        </Link>
      </div>
    );
  }
}
