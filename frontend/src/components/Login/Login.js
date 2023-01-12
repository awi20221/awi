import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../axios/axios";
import "./login_form.css";
import logo from "../css/images/logo.png";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [login, password]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/api/auth/login", {
          login: login,
          password: password
    });
        console.log(JSON.stringify(response?.data));
        console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ login, password, roles, accessToken });
        setLogin('');
        setPassword('');
        setSuccess(true);
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}

  return (
    <div className="container-login">
      {success ? (
        <section className="LogSucces">
          <h1 className="LogSuccesText">Zalogowałeś się pomyślnie</h1>
          <p>
            <Link to="/" className="HomeLink">
              Home Page
            </Link>
          </p>
        </section>
      ) : (
        <>
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
      )}
    </div>
  );
};

export default Login;

/*const axiosAPI = require('../axios/axios').axiosAPI



const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    const login = loginForm.querySelector("#login").value;
    const password = loginForm.querySelector("#haslo").value;

    if (login && password) {
        await axiosAPI.post("/api/auth/login", {
            login: login,
            password: password
        }).then((response) => {
            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);
            alert('Zostałeś zalogownay');
            window.location.replace('http://localhost:1234/index.html')  //TODO: przekierować na nową stronę główną z napisem wyloguj itd...

        }).catch(error => {
            console.error(error);
            alert('Błąd logowania, spróbuj ponownie')
        });
        loginForm.reset();
    }
})
 */
