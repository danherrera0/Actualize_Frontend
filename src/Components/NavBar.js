import React from "react";
import logo from "./actualize.png";
import "../App.css";

function Navbar() {
  return (
    <div className="nav">
    <img src={logo} alt="logo" />
    <h1 className="contact"><a href="https://medium.com/@daniaherrera" target="_blank" rel="noopener noreferrer" >Contact</a></h1>
    </div>
  );
}
export default Navbar;
