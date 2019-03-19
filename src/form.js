import React from "react";

export default class Form extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <form>
        <label>
          Make a new task:
          <input className="inputForm" type="text" name="content" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
