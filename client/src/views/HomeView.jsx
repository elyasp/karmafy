import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

import ListView from "./ListView";

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <Link to="/login" className="btn">
          <h3>Log In</h3>
        </Link>
        <Link to="/register" className="btn">
          <h3>Register</h3>
        </Link>
        <ListView />
      </div>
    );
  }
}
