import React from "react";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <img
          src="/hci-team14/hci.jpg"
          alt="HCI Icon"
          width="150"
          height="150"
          style={{ marginTop: "10px" }}
        ></img>
        <div
          style={{ marginTop: "10px", marginBottom: "20px", fontSize: "28px" }}
        >
          Hello teammates!
        </div>
        <img
          src="https://media4.giphy.com/media/2SYc7mttUnWWaqvWz8/giphy.gif"
          alt="Cat"
          width="70%"
          height="70%"
        ></img>
      </div>
    );
  }
}
