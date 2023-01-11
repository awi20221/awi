import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login_form.css";
import register_icon from "../css/images/register_icon.png";
import logo from "../css/images/logo.png";
import axios from "../../axios/axios";

//const REGISTER_URL = "/api/auth/register";

//function Register (props){
const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [fullName, setFullName] = useState("");
  const [validName, setValidName] = useState(false);

  const [login, setLogin] = useState("");
  const [validLogin, setValidLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(fullName);
  }, [fullName]);

  useEffect(() => {
    setValidLogin(login);
  }, [login]);

  useEffect(() => {
    setValidEmail(email);
  }, [email]);

  useEffect(() => {
    setValidPassword(password);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [fullName, login, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          fullName: fullName,
          login: login,
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      setSuccess(true);

      //clear the labels
      setFullName("");
      setPassword("");
      setEmail("");
      setLogin("");
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Rejestracja zakończona sukcesem!</h1>
          <p>
            <Link to="/login">
              Zaloguj się
            </Link>
          </p>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>
        </section>
      ) : (
        <div className="container-register">
          <div className="logo-login">
            <Link to="/">
              <img src={logo} alt="Logo z napisem AWI" />
            </Link>
          </div>
          <form className="form" id="registerForm" onSubmit={handleSubmit}>
            <div className="register-icon">
              <img src={register_icon} alt="Obrazek rejestracji użytkownika" />
            </div>

            <div className="form-row">
              <label htmlFor="fullName" className="form-label">
                Imie
              </label>
              <input
                type="text"
                className="form-control"
                ref={userRef}
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                autoComplete="off"
                id="fullName"
                name="fullName"
              />
            </div>

            <div className="form-row">
              <label htmlFor="login" className="form-label">
                Login
              </label>
              <input
                type="text"
                className="form-control"
                id="login"
                name="login"
                ref={userRef}
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              />
            </div>

            <div className="form-row">
              <label htmlFor="email" className="form-label">
                Podaj email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="password">
                Wprowadź hasło
              </label>
              <input
                type="password"
                className="form-control form-control-textarea"
                name="password"
                id="password"
                ref={userRef}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="spacer-form"></div>
            <button
              type="submit"
              className="button form-button"
              disabled={
                !validName || !validPassword || !validEmail || !validLogin
                  ? true
                  : false
              }
            >
              Zarejestruj się
            </button>
          </form>
          <div className="copyright">
            <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
