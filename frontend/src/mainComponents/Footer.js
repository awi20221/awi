import React from "react";
import { useNavigate, Link} from "react-router-dom";
import { useContext} from "react";
import AuthContext from "../context/AuthProvider";
import "../components/css/footer.css";
import log_out from "../components/css/images/logout_icon.png";
import settings from "../components/css/images/settings_icon.png";

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
  const navigate_to = async () => {
    navigate("/settings");
  };



  return (
    <footer className="footer">
      <div className="footer-logout">
          <img src={log_out} alt="Wyloguj sie" onClick={logout} />
          <p>Wyloguj</p>
      </div>

      <div className="footer-settings">
          <img src={settings} alt="Wyloguj sie" onClick={navigate_to} />
          <p>Settings</p>
      </div>

      <div className="footer-content">
        <p className="footer-links">
          <Link to="/" className="link-1">
            Home
          </Link>
          <Link to="/spolki">Spółki</Link>
          <Link to="/waluty">Kursy&nbsp;walut</Link>
          <a href="http://localhost:3000/graphs/wykres_html.html">Wykresy</a> 
          <Link to="/help">Help</Link>
        </p>
        <p>2022 &copy; Aplikacja Wspomagająca Inwestycje</p>
      </div>
    </footer>
  );
}

export default Footer;
