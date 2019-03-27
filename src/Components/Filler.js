import React from "react";
import "../App.css";

const Filler = props => {
  return (<div className="filler" style={{ width: `${props.percentage}%`}}>
  <div className="filler-highlight"></div>
  </div>
)
};

export default Filler;
