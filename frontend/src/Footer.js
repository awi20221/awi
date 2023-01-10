import React from "react";
import {Link} from "react-router-dom";
import "./components/css/footer.css";
import logo from "./components/css/images/logo.png";
import log_in from "./components/css/images/log_in.png";

function Footer(props) {
  return (

    <footer className="footer">
    <div className="footer-logo">
      <Link to="/"
        ><img src={logo} alt="Logo z napisem AWI"
      /></Link>
    </div>

    <div className="footer-login">
      <img src={log_in} alt="Ikona zaloguj sie" />
      <p className="footer-log">
        <Link to="/login" className="link-1">zaloguj się</Link>
        <Link to="/register">załóż konto</Link>
      </p>
    </div>

    <div className="footer-content">
      <p className="footer-links">
        <Link to="/" className="link-1" >Home</Link>
        <Link to="/spolki">Spółki</Link>
        <Link to="/waluty">Kursy&nbsp;walut</Link>
        <Link to="/kalkulator">Kalkulator</Link>
      </p>
      <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
    </div>
  </footer>
  );
}

export default Footer;
