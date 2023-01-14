import React from "react";

function Currency(props) {
  return (
    <tbody>
    <tr>
      <td>{props.c_name}</td>
      <td>{props.code}</td>
      <td>{props.mid}</td>
      <td>{props.date}</td>
    </tr>
    <div className="Spacer"></div>
    </tbody>
  );
}

export default Currency;
