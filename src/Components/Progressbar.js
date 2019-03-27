import React from "react";
import "../App.css";
import Filler from "./Filler.js";

const Progressbar = props => {
  return (
    <div className="progress-bar">
    <h1 className="percent-text"> {(props.percentage)}% Done </h1>
      <Filler percentage={props.percentage} />
    </div>
  );
};

export default Progressbar;
