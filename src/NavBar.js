import React from "react";
import logo from "./logo.png";
import "./App.css";

function Navbar() {
  return (
    <div className="nav">
      <img className="logo" alt="logo" src={logo} />
    </div>
  );
}
export default Navbar;
