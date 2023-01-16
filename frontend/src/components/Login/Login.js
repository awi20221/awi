import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import axios from "../../axios/axios";
import "./login_form.css";
import logo from "../css/images/logo.png";

const Login = () => {
  const {setAuth} = useAuth();
  //const{logstate} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const errRef = useRef();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

 /* useEffect(() => {
    const loggedInUser = localStorage.getItem("Logged in?");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser.login, foundUser.password,foundUser.accessToken);
      setAuth(foundUser.login, foundUser.password,foundUser.accessToken);
    }
  }, []);*/

  useEffect(() => {
    setErrMsg("");
  }, [login, password]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/api/auth/login", {
          login: login,
          password: password
    });
        const accessToken = response?.data?.accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userLogin', login);
        setAuth({ login, password, accessToken });

        setLogin('');
        setPassword('');
        navigate(from, { replace: true });
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');

        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');

        } else if (err.response?.status === 401) {

            setErrMsg('Unauthorized');
        } else if (err.response?.status === 409) {

            setErrMsg('Check-out your mail box and activate account')
        } else {

            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}

  return (
    <div className="container-login">
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

          <form className="form" id="loginForm" onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="user-icon"></div>
            <div className="form-row">
              <label htmlFor="login" className="form-label">
                Login
              </label>
              <input
                type="text"
                className="form-control"
                id="login"
                name="login"
                required="required"
                autoComplete="off"
                ref={userRef}
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              />
            </div>
            <div className="form-row">
              <label className="form-label" htmlFor="password">
                Hasło
              </label>
              <input
                type="password"
                className="form-control form-control-textarea"
                name="password"
                id="password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
        </>
    </div>
  );
};

export default Login;
