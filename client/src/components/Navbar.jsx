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
      <Navbar.Brand href="/" className="mr-auto text-white">
        Lost and Found
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="">
          <Nav.Link href="/profile" className="text-white">
            Profile
          </Nav.Link>
          <Nav.Link href="/logout" className="text-white">
            Logout
          </Nav.Link>
          <Nav.Link href="/register" className="text-white">
            Register
          </Nav.Link>
          <Nav.Link href="/login" className="text-white">
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarItem;
