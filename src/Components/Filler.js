import React from "react";
import "../App.css";

const Filler = props => {
  return (<div className="filler" style={{ width: `${props.percentage}%`}}>
  <div className="highlight"></div>
  <h1 className="ptext"> {(props.percentage)}% Done </h1>
  </div>
)
};

export default Filler;
