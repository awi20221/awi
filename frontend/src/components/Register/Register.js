import React from "react";
import { Link } from "react-router-dom";
import "./login_form.css";
import logo from "../css/images/logo.png";
import register_icon from "../css/images/register_icon.png";

function Register(props) {
  return (
    <div className="container-register">
      <div className="logo-login">
        <Link to="/">
          <img src={logo} alt="Logo z napisem AWI" />
        </Link>
      </div>
      <form className="form" id="registerForm">
        <div className="register-icon">
          <img
            src={register_icon}
            alt="Obrazek rejestracji użytkownika"
          />
        </div>

        <div className="form-row">
          <label for="first-name" className="form-label">
            Imie
          </label>
          <input
            type="text"
            className="form-control"
            id="first-name"
            name="first-name"
          />
        </div>

        <div className="form-row">
          <label for="last-name" className="form-label">
            Nazwisko
          </label>
          <input
            type="text"
            className="form-control"
            id="last-name"
            name="last-name"
          />
        </div>

        <div className="form-row">
          <label for="login" className="form-label">
            Podaj email
          </label>
          <input type="text" className="form-control" id="login" name="login" />
        </div>

        <div className="form-row">
          <label className="form-label" for="haslo">
            Wprowadź hasło
          </label>
          <input
            type="password"
            className="form-control form-control-textarea"
            name="haslo"
            id="haslo"
          />
        </div>

        <div className="spacer-form"></div>
        <button type="submit" className="button form-button">
          Zarejestruj się
        </button>
      </form>
      <div className="copyright">
        <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
      </div>
    </div>
  );
}

export default Register;
