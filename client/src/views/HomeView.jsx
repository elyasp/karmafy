import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      </div>
    );
  }
}
