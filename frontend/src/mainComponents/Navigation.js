import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/nav_bar.css";
import logo from "../components/css/images/logo.png";

const Nav = () => {
  const [burger, setBurger] = useState(false);

  function DropdownMenu() {
    return (
      <div className="dropdown">
        <ul className="nav-links-dropdown">
          <li>
            <Link to="/home">HOME</Link>
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
          <li>
            <Link to="/help">HELP</Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/home">
          <img src={logo} alt="Logo z napisem AWI" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home">HOME</Link>
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
        <li>
          <Link to="/help">HELP</Link>
        </li>
      </ul>
      <div className="burger" onClick={() => setBurger(!burger)}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      {burger && DropdownMenu()}
    </nav>
  );
};

export default Nav;
