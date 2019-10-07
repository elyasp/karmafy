import React, { Component } from "react";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0,0", // Null Island
      error: null
    };
  }

  // When the component is rendered to the DOM for the first time
  // such as at page load we call the Geolocation API to determine
  // a latitude and longitude for the browser

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            value: position.coords.latitude + "," + position.coords.longitude,
            error: null
          });
        },
        error => this.setState({ error: error.message })
      );
    }
  }

  // Respond to user input with event callback

  changeLocation(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  // The JSX definition for how to render this component on the page.
  // In this case, it's a simple input field for new todo items.

  render() {
    return (
      <input
        className="new-todo"
        value={this.state.value}
        onChange={evt => this.changeLocation(evt)}
      />
    );
  }
}
