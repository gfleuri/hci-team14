import React from "react";
import { removeReview } from "./review.js";
import { pathname, expand, renderPage, noRefresh } from "./main.js";

export class CreateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let title = "title-" + localStorage.getItem(pathname + "note-count");
    let context = "context-" + localStorage.getItem(pathname + "note-count");

    return (
      <div>
        <div className="note-create-title">
          Create Notes
          <button
            className="display-expand"
            onClick={() => expand("display-create")}
          >
            <div id="display-create-text">Hide</div>
          </button>
        </div>
        <div id="display-create">
          <form onSubmit={noRefresh}>
            <textarea
              id={title}
              name={title}
              rows="2"
              cols="50"
              placeholder="Enter a title, theme, or topic here"
            ></textarea>
          </form>
          <form onSubmit={noRefresh}>
            <textarea
              id={context}
              name={context}
              rows="5"
              cols="50"
              placeholder="Enter the context of the note here"
            ></textarea>
          </form>
          <button className="note-create-submit" onClick={addNote}>
            Create
          </button>
          <button className="note-create-clear" onClick={clearAll}>
            Clear All
          </button>
          <button className="note-create-restore" onClick={restoreAll}>
            Restore All
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Removes all of the existing notes
 **/
function clearAll() {
  localStorage.clear();
  localStorage.setItem(pathname + "note-count", 0);
  localStorage.setItem(pathname + "note-loaded", 0);
  localStorage.setItem(pathname + "note-sort", "none");
  localStorage.setItem(pathname + "note-review-progress", 0);
  localStorage.setItem(pathname + "note-review-total", 0);

  localStorage.setItem("note-folder-history", "notes");
  localStorage.setItem("note-folder-history-1", "notes");
  localStorage.setItem("note-folder-history-2", "");
  localStorage.setItem("note-folder-history-3", "");
  localStorage.setItem("note-folder-history-4", "");
  localStorage.setItem("note-folder-history-5", "");

  // Refreshing page classes
  renderPage();
}

/**
 * Restores all deleted notes
 **/
function restoreAll() {
  // Looping through IDs to load
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    // setting all note visibilities to true
    localStorage.setItem(pathname + "note-id-" + i + "-visibility", "true");
  }

  // Refreshing page classes
  removeReview();
  renderPage();
}

/**
 * Creates a new note
 **/
function addNote() {
  // Create new note ID
  let newNoteID = localStorage.getItem(pathname + "note-count");

  // Store new note data
  localStorage.setItem(
    pathname + "note-id-" + newNoteID + "-title",
    document.getElementById("title-" + newNoteID).value
  );
  localStorage.setItem(
    pathname + "note-id-" + newNoteID + "-context",
    document.getElementById("context-" + newNoteID).value
  );
  localStorage.setItem(
    pathname + "note-id-" + newNoteID + "-visibility",
    "true"
  );
  localStorage.setItem(
    pathname + "note-id-" + newNoteID + "-difficulty",
    "Medium"
  );
  localStorage.setItem(pathname + "note-id-" + newNoteID + "-review", "");
  localStorage.setItem(pathname + "note-id-" + newNoteID + "-checked", "false");

  // Increasing note counter by 1, locStor returns string so must parse
  localStorage.setItem(
    pathname + "note-count",
    parseFloat(localStorage.getItem(pathname + "note-count")) + 1
  );

  // Resetting text boxes
  document.getElementById("title-" + newNoteID).value = "";
  document.getElementById("context-" + newNoteID).value = "";

  // Will Disable Review and Refresh classes
  removeReview();
}
