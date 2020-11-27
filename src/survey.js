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
          <b>Instructions:</b>
          <br />
          <br />
          We've placed 7 notes into the folder titled "Biology" below. In this
          hypothetical situation, you have 3 days to study for your biology
          exam, and you need to take notes on a biology chapter, save it in your
          biology folder, and create a study plan where your notes are ordered
          by descending level of difficulty over the next 3 days.
          <br />
          <br />
          <b>Tasks:</b>
          <br />
          <br />
          1. Take a few more notes on the Excerpt provided below.
          <br />
          2. Rank the notes by a difficulty level.
          <br />
          3. Select the specified number of days available to study.
          <br />
          4. Review the suggested resources linked to the notes that you wrote.
          <br />
          5. Fill out the Google Survey form. Thank you!
          <br />
          <br />
          <b>Google Form:</b>{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdmMnJnog3gbS3tVCZJitiwi_lCChcjduHLQ_EkCIqCdEFjHQ/viewform"
            className="note-google-form"
          >
            <div className="note-google-form-context">Google Form Link</div>
          </a>
          <br />
          <br />
          <div
            style={{
              margin: "10px 50px 20px 50px",
              padding: "20px",
              backgroundColor: "rgb(247,247,247)",
              borderRadius: "10px",
              color: "rgb(80,80,80)",
            }}
          >
            Home office: The nucleus
            <br />
            <br />
            The nucleus houses and protects the cell’s DNA, which contains all
            of the instructions necessary for the cell to function. The DNA is
            like a set of blueprints for the cell, so you can think of the
            nucleus as the office where the blueprints are kept. If information
            from the blueprints is required, the information is copied into RNA
            molecules and moved out of the nucleus. The DNA plans stay safely
            locked away.
          </div>
          <button
            className="note-create-clear"
            style={{ width: "100%" }}
            onClick={clearAll}
          >
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
