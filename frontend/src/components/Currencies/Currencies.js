import React from "react";
import "./Currencies.css";
import Currency from "./single_currency";
import axios from "axios";
//const axios = require("axios").default;

class List extends React.Component {
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
    let url = "http://localhost:3001/api/currencies";
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
      <div>
        <div class="tabele">
          <table>
            <caption>Kursy walut</caption>
            <thead>
              <tr>
                <th>Waluta</th>
                <th>Skrót</th>
                <th>?</th>
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
    );
  }
}

export default List;
