import React from "react";
import "../App.css";
import Filler from "./Filler.js";

const Progressbar = props => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

export default Progressbar;
