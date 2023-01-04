import React from "react";
import "./Currencies.css";
import Currency from "./single_currency";
import axios from "axios";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.currency_model = [
      {
        slug: "chf",
        id: "1234",
        c_name: "frank szwajcarski",
        code: "",
        mid: 4.9806,
        date: "11-09-2009",
      },
      {
        slug: "usd",
        id: "3456",
        c_name: "dolar amerykanski",
        code: "",
        mid: 4.9806,
        date: "11-09-2009",
      },
    ];
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    //const resp = await axios.get('http://localhost:3001/api/currencies');
    //console.log(resp);
    axios.get("http://localhost:3001/api/currencies");
  }

  render() {
    return (
      <div>
        <p>Kursy walut</p>

        {this.currency_model.map((currency) => (
          <Currency //model w osobnym pliku
            c_name={currency.c_name}
            slug={currency.slug}
            mid={currency.mid}
            id={currency.id}
            date={currency.date}
          />
        ))}
      </div>
    );
  }
}

export default List;
