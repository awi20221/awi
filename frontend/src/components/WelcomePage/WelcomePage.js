import React from "react";
import { Link } from "react-router-dom";
import "./welcomepage.css";
import "../css/nav_bar.css";
import logo from "../css/images/logo.png";

function WelcomePage(props) {
  return (
    <div className="container-home">
      <nav className="home-nav">
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
          <li>
            <Link to="/help">HELP</Link>
          </li>
        </ul>
        <div className="burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      <div id="welcome-text">
        <h1>
          Aplikacja
          <br />
          Wpomagajaca
          <br />
          Inwestycje
        </h1>
        <p>
          Witaj w aplikacji, która pozwoli Ci sprawdzić notowania spółek oraz
          <br />
          skutecznie zainwestować
        </p>
        <div className="buttons">
          <Link to="/login">
            <div className="logowanie">
              <b>Zaloguj się</b>
            </div>
          </Link>
          <Link to="/register">
            <div className="rejestracja">
              <b>Zarejestruj się</b>
            </div>
          </Link>
        </div>
        <div className="copyright">
          <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
