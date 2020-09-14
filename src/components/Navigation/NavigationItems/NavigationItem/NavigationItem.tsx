import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  exact: boolean;
  link: string;
};

const NavigationItem: React.FC<Props> = ({ exact, link, children }) => (
  <li>
    <NavLink to={link} exact={exact}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
