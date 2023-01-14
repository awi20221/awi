import { React, useState, useEffect } from "react";
import "./Currencies.css";
import axios from "../../axios/axios";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";
//import SearchBar from "./searchBar";
//import ListPage from "./ListPage";
//const axios = require("axios").default;
import Currency from "./single_currency";

const CurrenciesList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  let [lastDate, setLastDate] = useState("2022-10-03");//data najstarsza na sztyno - w razie błędu będzie zawsze działać
                                                        //no chyba ze juz z bazy zostanie usuniete

  useEffect(() => {
    fetchLastDate().then(lastDate =>
    fetchCurrencies(lastDate))    
  }, [lastDate]);
  
    
  async function fetchLastDate() {
    let url = "http://localhost:3001/api/currencies/update-time";
    await axios
      .get(url)
      .then((response) => {
        //console.log(response.data);
        setLastDate(response.data.effectiveDate);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
      return lastDate;
  }

  async function fetchCurrencies(lastDate) {
    //console.log(lastDate);
    let url = "http://localhost:3001/api/currencies/effectiveDate/" + lastDate;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.currencies);
        setCurrencies(response.data.currencies);
        setSearchResults(response.data.currencies);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

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
            {currencies.map((currency) => (
              <Currency //model w osobnym pliku
                key={currency._id}
                c_name={currency.currency}
                slug={currency.slug}
                mid={currency.mid}
                date={currency.effectiveDate}
                code={currency.code}
              /> 
            ))}
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CurrenciesList;
