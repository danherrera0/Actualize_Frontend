import React from "react";
import "../App.css";

const Filler = props => {
  return (<div className="filler" style={{ width: `${props.percentage}%`}}>
  <div className="filler-highlight"></div>
  <h1 className="percent-text"> {(props.percentage)}% Done </h1>
  </div>
)
};

export default Filler;
