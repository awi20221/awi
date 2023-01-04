import React from "react";

function Currency(props) {
  return (
    <div className="currency">
      <div className="currency-element">{props.c_name}</div>
      <div className="currency-element">{props.slug}</div>
      <div className="currency-element">{props.mid}</div>
      <div className="currency-element">{props.date}</div>
    </div>
  );
}

export default Currency;
