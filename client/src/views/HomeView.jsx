import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

export default class HomeView extends Component {
  render() {
    return (
      <div className="container mx-auto text-center">
        <h1 className="text-center">Lost and Found</h1>

        <Link to="/login" className="btn">
          <h3>Log In</h3>
        </Link>
        <Link to="/register" className="btn">
          <h3>Register</h3>
        </Link>
      </div>
    );
  }
}
