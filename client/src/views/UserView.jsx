import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// import Importer from "./ItemAddView";

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
        <p>===============TEST ENV FOUND ITEM FORM ===================</p>

        <p>============================================</p>
        <Link to="/item" className="btn">
          <h3>Item</h3>
        </Link>
      </div>
    );
  }
}
