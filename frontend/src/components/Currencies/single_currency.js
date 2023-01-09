import React from "react";

function Currency(props) {
  return (
    //<div className="currency">
    //<div className="currency-element">{props.c_name}</div>
    //<div className="currency-element">{props.c_name}</div>
    //<div className="currency-element">{props.mid}</div>
    //<div className="currency-element">{props.date}</div>
    //</div>
    <tbody>
    <tr>
      <td>{props.c_name}</td>
      <td>{props.c_name}</td>
      <td>{props.mid}</td>
      <td>{props.date}</td>
    </tr>
    </tbody>
  );
}

export default Currency;
