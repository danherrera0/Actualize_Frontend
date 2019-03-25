import React from "react";
import logo from "./actualize.png";
import "../App.css";

function Navbar() {
  return (
    <div className="nav">
      <img src={logo} alt="logo" />
        <h2 className="about">About</h2>
        <h2 className="contact">Contact</h2>
    </div>
  );
}
export default Navbar;
