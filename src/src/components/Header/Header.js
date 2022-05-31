import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import ShowData from "../ShowData/ShowData";
import navCss from "./Header.module.css";
const Header = (props) => {
  return (
    <div className={navCss.mainHeader}>
      <nav>
        <h2>
          <span className={navCss.spanCol}>F</span>orm
          <span className={navCss.spanCol}>V</span>alidation
        </h2>
        <ul>
          <li>
            <NavLink to="/">
              <span className={navCss.spanCol}>H</span>ome
            </NavLink>
          </li>

          <li>
            <NavLink to="/addusers">
              <span className={navCss.spanCol}>A</span>dd User
            </NavLink>
          </li>
          <li>
            <NavLink to="/showData">
              <span className={navCss.spanCol}>L</span>ist of User
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
