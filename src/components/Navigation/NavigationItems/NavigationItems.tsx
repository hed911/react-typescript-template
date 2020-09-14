import React from "react";

import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import NavigationItem from "./NavigationItem/NavigationItem";

type Props = { direction: string };

const NavigationItems = ({ direction }: Props) => {
  let items = (
    <>
      <NavLink className="nav-link" exact to="/">
        Dashboard
      </NavLink>
      <NavLink className="nav-link" to="/services">
        Services
      </NavLink>
      <NavDropdown title="Configuration" id="collasible-nav-dropdown">
        <NavLink className="dropdown-item" to="/users">
          Users
        </NavLink>
      </NavDropdown>
    </>
  );
  if (direction == "right") {
    items = (
      <>
        <NavDropdown title="Herman Lee" id="collasible-nav-dropdown">
          <NavLink className="dropdown-item" to="/profile">
            My profile
          </NavLink>
          <NavLink className="dropdown-item" to="/logout">
            Logout
          </NavLink>
        </NavDropdown>
      </>
    );
  }
  return <>{items}</>;
};

export default NavigationItems;
