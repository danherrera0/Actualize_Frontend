import React from "react";
import "../App.css";
import Form from "./Form";

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="showform" onClick={() => this.showform()}>
        <h3>Add Task!</h3>
      </button>
    </div>
  );
}
export default Sidebar;
