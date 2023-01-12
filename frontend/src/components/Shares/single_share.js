import React from "react";

function Share(props) {
  return (

    <tbody>
    <tr>
      <td>{props.name}</td>
      <td>{props.minimalRate}</td>
      <td>{props.maximalRate}</td>
      <td>{props.change}</td>
      <td>{props.date}</td>
    </tr>
    <div className="Spacer"></div>
    </tbody>
  );
}

export default Share;
