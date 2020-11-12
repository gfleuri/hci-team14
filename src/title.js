import React from "react";

export class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    setTimeout(() => {
      document.getElementById("title-text").innerHTML = "Develop";
    }, 2000);
    setTimeout(() => {
      document.getElementById("title-text").innerHTML = "Retain";
    }, 4000);
    return (
      <div className="title-container">
        <div className="title-text-1" id="title-text">
          Record
        </div>
        <div className="title-text-2">your own knowledge</div>
        <div className="title-text-3" style={{ marginTop: "20px" }}>
          Create and Review notes, sort by difficulty,
        </div>
        <div className="title-text-3">
          and receive unique user-based suggestions.
        </div>
      </div>
    );
  }
}
