import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./components/css/nav_bar.css";
import logo from "./components/css/images/logo.png";

const Nav = () => {
  const userRef = useRef();
  const burger = useState("");
  const nav = useState("");
  const navLinks = useState("");

  const NavSlider = () => {
    burger("click", () => {
      nav.classList.toggle("nav-active"); //wysuwanie sie menu bocznego
      console.log("hej");
      //animacja dla el menu
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 5 + 0.8
          }s`;
        }
      });

      //animacja burgera
      burger.classList.toggle("rotate");
    });
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo z napisem AWI" />
        </Link>
      </div>
      <ul className="nav-links" value={nav} ref={userRef}>
        <li value={navLinks} ref={userRef}>
          <Link to="/">HOME</Link>
        </li>
        <li value={navLinks} ref={userRef}>
          <Link to="/spolki">SPÓŁKI</Link>
        </li>
        <li value={navLinks} ref={userRef}>
          <Link to="/kalkulator">KALKULATOR</Link>
        </li>
        <li value={navLinks} ref={userRef}>
          <Link to="/waluty">KURSY&nbsp;WALUT</Link>
        </li>
      </ul>
      <div className="burger" onClick={NavSlider}  ref={userRef} >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Nav;
