import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

import ListView from "./ListView";

export default class HomeView extends Component {
  render() {
    return (
      <div className="homeview">
        <ListView />
      </div>
    );
  }
}
