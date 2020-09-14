import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import NavigationItems from "../NavigationItems/NavigationItems";

type Props = {};

const Toolbar = ({}: Props) => (
  <header>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">HEDU911-Template</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavigationItems direction="left" />
        </Nav>
        <Nav>
          <NavigationItems direction="right" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Toolbar;
