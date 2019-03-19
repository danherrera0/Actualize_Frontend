import React from "react";

export default class Form extends React.Component {
  state = {
    user_id: 1,
    column_id: 1,
    value: ""
  };

  addCard = () => {};

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
        content: this.state.value
      })
    })
      .then(r => r.json())
      .then(task => console.log(task));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Make a new task:
          <input
            value={this.state.value}
            onChange={this.handleChange}
            className="inputForm"
            type="text"
            name="content"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
