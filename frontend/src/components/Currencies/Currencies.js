import React from "react";
import "./Currencies.css";
import Currency from "./single_currency";
import axios from "axios";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";
//const axios = require("axios").default;

let lastDate = "2022-10-03"; //data najstarsza na sztyno - w razie błędu będzie zawsze działać
//no chyba ze juz z bazy zostanie usuniete

async function fetchLastDate() {
  let url = "http://localhost:3001/api/currencies/update-time";
  await axios
    .get(url)
    .then((response) => {
      //console.log(response.data);
      lastDate = response.data.effectiveDate;
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  console.log(lastDate);
}

fetchLastDate();

class CurrenciesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: "",
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    //console.log(lastDate);
    let url = "http://localhost:3001/api/currencies/effectiveDate/" + lastDate;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.currencies);
        this.setState({
          currencies: response.data.currencies,
        });
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  render() {
    return (
      <>
      <Nav />
        <div className="container-currencies">
          <div className="tabele">
            <table>
              <caption>
                Kursy walut
                <p className="CurrenciesDate">Data: {lastDate}</p>
              </caption>
              <thead>
                <tr>
                  <th>Waluta</th>
                  <th>Skrót</th>
                  <th>Mid</th>
                  <th>Data</th>
                </tr>
              </thead>

              {Array.from(this.state.currencies).map((currency) => (
                <Currency //model w osobnym pliku
                  key={currency._id}
                  c_name={currency.currency}
                  slug={currency.slug}
                  mid={currency.mid}
                  id={currency._id}
                  date={currency.effectiveDate}
                />
              ))}
            </table>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default CurrenciesList;
