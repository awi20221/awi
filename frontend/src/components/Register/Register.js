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
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [password, login, email, fullName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //try {
    if (login && email && password) {
      //clear the labels
      setFullName("");
      setPassword("");
      setEmail("");
      setLogin("");
      const response = await axios
        .post("http://localhost:3001/api/auth/register", {
          fullName: fullName,
          login: login,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setSuccess(true);
        })
        .catch((error) => {
          console.error(error);
          if (!error?.response) {
            setErrMsg("No Server Response");
          } else if (error.response?.status === 410) {
            setErrMsg("Login taken");
          }
          else if (error.response?.status === 411) {
              setErrMsg("Email taken");
          } else {
            setErrMsg("Registration Failed");
          }
        })
    } else {
      setErrMsg("Registration Failed");
    }
  };

  return (

    <div className="container-register">
      {success ? (
        <section className="RegSucces">
          <h1 className="RegSuccesText">Rejestracja zakończona sukcesem!</h1>
          <p>Sprawdź skrzynke mailową, gdzie znajduje sie link aktywacyjny</p>
          <br/>
          {/*<p>
            <Link to="/login" className="Log-in">Zaloguj się</Link>
      </p>*/}
        </section>
      ) : (
        <>
          <div className="bg">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
          <div className="logo-login">
            <Link to="/">
              <img src={logo} alt="Logo z napisem AWI" />
            </Link>
          </div>

          <form className="form" id="registerForm" onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
        </>
      )}
      </div>

  );
};

export default Register;
