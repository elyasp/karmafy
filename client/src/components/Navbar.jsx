import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  DropdownButton,
  MenuItem,
  CollapsibleNav
} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarItem = () => {
  return (
    <Navbar className="sticky-top" bg="dark" expand="lg">
      <Link to="/" className="mr-auto text-white">
        Home
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="">
          <Link to="/user" className="text-white">
            Dashboard
          </Link>
          <Link to="/register" className="text-white">
            Register
          </Link>
          <Link to="/login" className="text-white">
            Login
          </Link>
          <Link to="/logout" className="text-white">
            Logout
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarItem;
