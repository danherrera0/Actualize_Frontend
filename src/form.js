import React from "react";

export default class Form extends React.Component {
  state = {
    user_id: 1,
    column_id: 1,
    complete: false,
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
  };

  render() {
    // console.log(this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Make a new task:
          <input className="inputForm" type="text" name="content" />
        </label>
        <input
          type="submit"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
