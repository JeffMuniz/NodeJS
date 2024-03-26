import React from "react";
import Icon from "../Icon/Icon";
import { NavCol, NavRow } from "./Navbar.styles";

const Navbar = () => (
  <NavRow>
    <NavCol xs={12}>
      <Icon name="mac" />
    </NavCol>
  </NavRow>
);

export default Navbar;
