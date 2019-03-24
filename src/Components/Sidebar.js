import React from "react";
import ReactDOM from "react-dom";
import "../App.css";
import Form from "./Form";

class Sidebar extends React.Component {
  state={
    showform: true
  }

  render(){
  return (
    <div className="sidebar">
    {this.state.showform ? (
      <Form showform={this.props.showform} addCard={this.props.addCard} />
    ) : null}
    </div>
  );

}
}
export default Sidebar;
