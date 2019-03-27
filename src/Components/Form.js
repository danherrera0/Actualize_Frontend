import React from "react";
import "../App.css";

export default class Form extends React.Component {
  state = {
    user_id: 1,
    column_id: 1,
    value: ""
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        column_id: this.state.column_id,
        completed: false,
        content: this.state.value,
        percentage:0,
      })
    })
      .then(r => r.json())
      .then(task => {
        this.props.addCard(task);
      });
    this.setState({ value: "" });
  };
  //adds task to backend

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-highlight"></div>
        <label>
          <p className="form-txt">Add Item</p>
        </label>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          className="inputForm"
          type="text"
          name="content"
        />
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    )
  }
}
