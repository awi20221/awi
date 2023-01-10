import React from "react";
import { Link } from "react-router-dom";
import "./components/css/nav_bar.css";
import logo from "./components/css/images/logo.png";

function Nav(props) {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo z napisem AWI" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/spolki">SPÓŁKI</Link>
        </li>
        <li>
          <Link to="/kalkulator">KALKULATOR</Link>
        </li>
        <li>
          <Link to="/waluty">KURSY&nbsp;WALUT</Link>
        </li>
      </ul>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Nav;
