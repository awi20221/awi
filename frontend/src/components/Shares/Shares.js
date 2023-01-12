import React from "react";
import "./shares.css";
import Share from "./single_share";
import axios from "axios";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";
//const axios = require("axios").default;

let lastDate = "2023-01-02"; //data najstarsza na sztyno - w razie błędu będzie zawsze działać
//no chyba ze juz z bazy zostanie usuniete

async function fetchLastDate() {
  let url = "http://localhost:3001/api/shares/update-time";
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

class SharesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shares: "",
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    let url = "http://localhost:3001/api/shares/effectiveDate/" + lastDate;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.shares);
        this.setState({
          shares: response.data.shares,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <Nav />
        <div className="container-shares">
          <div className="tabele">
            <table>
              <caption>
                Akcje
                <p className="CurrenciesDate">Data: {lastDate}</p>
              </caption>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Minimal Rate</th>
                  <th>Maximal Rate</th>
                  <th>Change</th>
                  <th>Data</th>
                </tr>
              </thead>

              {Array.from(this.state.shares).map((share) => (
                <Share //model w osobnym pliku
                  key={share._id}
                  name={share.name}
                  minimalRate={share.minimalRate}
                  maximalRate={share.maximalRate}
                  change={share.change}
                  id={share._id}
                  date={share.effectiveDate}
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

export default SharesList;
