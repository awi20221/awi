import React from "react";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";
import "./calculator.css";

function Calculator(props) {
  return (
    <div className="container-calculator">
      <Nav />
      <h1>Strona Kalkulator</h1>
      <Footer />
    </div>
  );
}

export default Calculator;
