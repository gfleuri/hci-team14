import React from "react";
import { clearAll } from "./create.js";

export class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <button className="note-survey-button" onClick={evaluate}>
          <b>Click to Start Design Evaluation</b>
        </button>
        <div className="survey-info" id="survey-info">
          <b>Instructions:</b> ...cooming soon...
          <br />
          <br />
          <b>Google Form:</b> ...cooming soon...
          <br />
          <br />
          <button className="note-create-clear" onClick={clearAll}>
            Disable Evaluation
          </button>
        </div>
      </div>
    );
  }
}

function evaluate() {
  clearAll();
  localStorage.setItem("survey", "true");
  localStorage.setItem("survey-info", "true");
}
