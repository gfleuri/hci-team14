import React from "react";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  componentDidMount() {}

  render() {
    return <div>Hello teammates!</div>;
  }
}
