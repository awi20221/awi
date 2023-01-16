import React from "react";
import { useNavigate, Link} from "react-router-dom";
import { useContext} from "react";
import AuthContext from "../context/AuthProvider";
import "../components/css/footer.css";
import log_out from "../components/css/images/logout_icon.png";
import log_in from "../components/css/images/log_in.png";

function Footer(props) {

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    localStorage.removeItem("accessToken");
    localStorage.clear()
    navigate("/");
  };


  return (
    <footer className="footer">
      <div className="footer-logout">
          <img src={log_out} alt="Wyloguj sie" onClick={logout} />
          <p>Wyloguj</p>
      </div>

      <div className="footer-login">
        <img src={log_in} alt="Ikona zaloguj sie" />
        <p className="footer-log">
          <Link to="/login" className="link-1">
            zaloguj się
          </Link>
          <Link to="/register">załóż konto</Link>
        </p>
      </div>

      <div className="footer-content">
        <p className="footer-links">
          <Link to="/" className="link-1">
            Home
          </Link>
          <Link to="/spolki">Spółki</Link>
          <Link to="/waluty">Kursy&nbsp;walut</Link>
          <Link to="/kalkulator">Kalkulator</Link>
          <Link to="/help">Help</Link>
        </p>
        <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
      </div>
    </footer>
  );
}

export default Footer;
