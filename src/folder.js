import React from "react";
import { expand, noRefresh } from "./main.js";

export class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    // Storing Recent Folder History
    if (
      localStorage.getItem("note-folder-history", "") === null ||
      localStorage.getItem("note-folder-history-1", "") === null ||
      localStorage.getItem("note-folder-history-2", "") === null ||
      localStorage.getItem("note-folder-history-3", "") === null ||
      localStorage.getItem("note-folder-history-4", "") === null ||
      localStorage.getItem("note-folder-history-5", "") === null
    ) {
      localStorage.setItem("note-folder-history", "notes");
      localStorage.setItem("note-folder-history-1", "notes");
      localStorage.setItem("note-folder-history-2", "");
      localStorage.setItem("note-folder-history-3", "");
      localStorage.setItem("note-folder-history-4", "");
      localStorage.setItem("note-folder-history-5", "");
    }

    let history1 = localStorage.getItem("note-folder-history-1");
    let history2 = localStorage.getItem("note-folder-history-2");
    let history3 = localStorage.getItem("note-folder-history-3");
    let history4 = localStorage.getItem("note-folder-history-4");
    let history5 = localStorage.getItem("note-folder-history-5");

    return (
      <div>
        <div className="note-folder-title">
          Folders
          <button
            className="display-expand"
            onClick={() => expand("display-folder")}
          >
            <div id="display-folder-text">Hide</div>
          </button>
        </div>
        <div id="display-folder">
          <div className="note-folder-context">
            Here you can create folders for your notes. Enter a folder name and
            press enter to view its contents!
          </div>
          <form onSubmit={noRefresh}>
            <textarea
              id="history-folder"
              name="history-name"
              rows="2"
              cols="50"
              placeholder="Enter the Folder name here"
            ></textarea>
          </form>
          <button
            className="note-create-submit"
            onClick={() =>
              openFolder(document.getElementById("history-folder").value)
            }
          >
            Open Folder
          </button>
          <div className="note-folder-recent-title">
            Recent Folders (Currently Open:{" "}
            {localStorage.getItem("note-folder-history").toUpperCase()})
          </div>
          <div style={{ display: "inline-block" }}>
            {history1 !== "" && (
              <div
                className="note-folder-history"
                onClick={() => openFolder(history1)}
              >
                {history1.toUpperCase()}
              </div>
            )}
            {history2 !== "" && (
              <div
                className="note-folder-history"
                onClick={() => openFolder(history2)}
              >
                {history2.toUpperCase()}
              </div>
            )}
            {history3 !== "" && (
              <div
                className="note-folder-history"
                onClick={() => openFolder(history3)}
              >
                {history3.toUpperCase()}
              </div>
            )}
            {history4 !== "" && (
              <div
                className="note-folder-history"
                onClick={() => openFolder(history4)}
              >
                {history4.toUpperCase()}
              </div>
            )}
            {history5 !== "" && (
              <div
                className="note-folder-history"
                onClick={() => openFolder(history5)}
              >
                {history5.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Opens a new folder
 * @param {string} name name of the folder that will be opened
 **/
function openFolder(name) {
  localStorage.setItem("note-folder-history", name);
  // eslint-disable-next-line
  window.location.pathname = window.location.pathname;
}
