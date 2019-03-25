import React from "react";
import "../App.css";

const Filler = props => {
  return (<div className="filler" style={{ width: `${props.percentage}%`}}>
  <h1 className="ptext">{(props.percentage)}%</h1>

  </div>
)
};

export default Filler;
