import React from "react";
import {Link} from "react-router-dom";
import "./login_form.css";
import logo from "../css/images/logo.png";


function Login(props) {
  return (
    <div className="container-login">
      {" "}
      <div className="logo-login">
        <Link to="/">
          <img src={logo} alt="Logo z napisem AWI" />
        </Link>
      </div>
      <form className="form" id="loginForm">
        <div className="user-icon"></div>
        <div className="form-row">
          <label for="login" className="form-label">
            Login
          </label>
          <input
            type="text"
            className="form-control"
            id="login"
            name="login"
            required="required"
          />
        </div>
        <div className="form-row">
          <label className="form-label" for="haslo">
            Hasło
          </label>
          <input
            type="password"
            className="form-control form-control-textarea"
            name="haslo"
            id="haslo"
            required="required"
          />
        </div>
        <div className="spacer-form"></div>
        <button type="submit" className="button form-button">
          Zaloguj się
        </button>
        <p className="simple-tekst">
          Nie masz konta?
          <Link to="/register">
            <br />
            Zarejestruj sie
          </Link>
        </p>
      </form>
      <div className="copyright">
        <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
      </div>
    </div>
  );
}

export default Login;
