import React from "react";
import { pathname, expand, renderPage } from "./main.js";

export class SortNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let size = localStorage.getItem(pathname + "note-loaded");

    return (
      <div>
        <div className="note-sort-title">
          Sort Notes ({size})
          <button
            className="display-expand"
            onClick={() => expand("display-sort")}
          >
            <div id={"display-sort-text"}>Hide</div>
          </button>
        </div>
        <div id="display-sort">
          <button
            className="note-sort-button-all"
            onClick={() => changeSort("none")}
          >
            Show All
          </button>
          <button
            className="note-sort-button-easy"
            onClick={() => changeSort("Easy")}
          >
            Sort Easy
          </button>
          <button
            className="note-sort-button-medium"
            onClick={() => changeSort("Medium")}
          >
            Sort Medium
          </button>
          <button
            className="note-sort-button-hard"
            onClick={() => changeSort("Hard")}
          >
            Sort Hard
          </button>
          <button
            className="note-sort-button-rank"
            onClick={() => changeSort("Rank")}
          >
            Sort Ranked
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Changes how all of the notes will be sorted upon load
 * @param {string} difficulty type of new difficulty to sort by
 **/
function changeSort(difficulty) {
  // Setting new sort
  localStorage.setItem(pathname + "note-sort", difficulty);

  // Refreshing page classes
  renderPage();
}
