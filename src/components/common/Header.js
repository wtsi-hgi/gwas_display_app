import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  const activeStyle = { color: "orange" };
  return (
    <nav>
      <NavLink activeStyle={activeStyle} exact to="/">
        {" "}
        Home{" "}
      </NavLink>
      {" | "}
      <NavLink activeStyle={activeStyle} to="/wgs">
        Genomes{" "}
      </NavLink>{" "}
      {" | "}
      <NavLink activeStyle={activeStyle} to="/wes">
        Exomes
      </NavLink>
      {" | "}
      <NavLink activeStyle={activeStyle} to="/upload">
        Upload
      </NavLink>
    </nav>
  );
}

export default Header;
