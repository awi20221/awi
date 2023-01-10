import React from "react";
import "./shares.css";
import Share from "./single_share";
import axios from "axios";
import Footer from "../../Footer";
import Nav from "../../Navigation";
//const axios = require("axios").default;

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
    let url = "http://localhost:3001/api/shares ";
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

  /*
  //sposob 1
    const { data } = await axios({
      method: "get",
      url: "http://localhost:3001/api/currencies",
    });
    //const resp = axios.get("http://localhost:3001/api/currencies");
    console.log(data);
    //const cur = resp.data;
    this.setState({ data: data.currencies});

    //sposob 2
    try { 
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3001/api/currencies",
      });
      console.log(data);
      //this.setState({ data });
    } catch {
      console.error("Wystąpił błąd podczas pobierania danych");
    }
  } */

  render() {
    return (
      <div className="container-shares">
        <Nav/>
        <div class="tabele">
          <table>
            <caption>Akcje</caption>
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
        <Footer/>
      </div>
    );
  }
}

export default SharesList;
