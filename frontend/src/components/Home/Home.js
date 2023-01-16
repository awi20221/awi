import { Link } from "react-router-dom";
import "./home.css";
import logo from "../css/images/logo.png";
import Footer from "../../mainComponents/Footer";

const Home = () => {
  return (
    <div className="container-home">
      <div id="welcome-text">
        <div className="logo-home">
          <img src={logo} alt="Logo z napisem AWI" />
        </div>
        <h1>
          Co chcesz
          <br />
          zrobić?
        </h1>
        <p>Wybierz jedna z opcji</p>

        <nav className="home-nav">
          <ul className="nav-links-home">
            <div className="content1">
              <div className="homeLink">
                <Link to="/spolki">
                  Zobacz&nbsp;aktualne
                  <br />
                  notowania&nbsp;spółek
                </Link>
              </div>
              <div className="homeLink">
                <a href="http://localhost:3000/graphs/wykres_html.html">
                  Przejdź&nbsp;do
                  <br />
                  strony&nbsp;z&nbsp;wykresami
                </a>
              </div>
            </div>
            <div className="content2">
              <div className="homeLink">
                <Link to="/waluty">
                  Zobacz&nbsp;aktualne
                  <br />
                  kursy&nbsp;walut
                </Link>
              </div>
              <div className="homeLink">
                <Link to="/help">
                  Potrzebujesz
                  <br />
                  pomocy?
                </Link>
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
