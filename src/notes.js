import React from "react";
import ReactDOM from "react-dom";

// Initializng counter for amount of notes
if (localStorage.getItem("note-count") === null) {
  localStorage.setItem("note-count", 0);
}

// Preventing Site/Page Refresh when entering form
let noRefresh = function (e) {
  e.preventDefault();
};

function clearAll() {
  localStorage.clear();
  localStorage.setItem("note-count", 0);
  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
}

// Adding NEW notes
function addNote() {
  // Create new note ID
  let newNoteID = localStorage.getItem("note-count");

  // Store new note data
  localStorage.setItem(
    "note-id-" + newNoteID + "-title",
    document.getElementById("title-" + newNoteID).value
  );
  localStorage.setItem(
    "note-id-" + newNoteID + "-context",
    document.getElementById("context-" + newNoteID).value
  );
  localStorage.setItem("note-id-" + newNoteID + "-visibility", "true");

  // Increasing note counter by 1, locStor returns string so must parse
  localStorage.setItem(
    "note-count",
    parseFloat(localStorage.getItem("note-count")) + 1
  );

  // Resetting text boxes
  document.getElementById("title-" + newNoteID).value = "";
  document.getElementById("context-" + newNoteID).value = "";

  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
}

export class CreateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let title = "title-" + localStorage.getItem("note-count");
    let context = "context-" + localStorage.getItem("note-count");
    return (
      <div>
        <div style={{ marginBottom: "10px" }}>Create a note</div>
        Title
        <form onSubmit={noRefresh}>
          <textarea
            id={title}
            name={title}
            rows="2"
            cols="50"
            placeholder="Enter a title, theme, or topic here"
          ></textarea>
        </form>
        Context
        <form onSubmit={noRefresh}>
          <textarea
            id={context}
            name={context}
            rows="5"
            cols="50"
            placeholder="Enter the context of the note here"
          ></textarea>
        </form>
        <button style={{ margin: "10px" }} onClick={addNote}>
          Create
        </button>
        <button style={{ margin: "10px" }} onClick={clearAll}>
          Clear All
        </button>
      </div>
    );
  }
}

export class LoadNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let loadedNotes = []; // Will Store each loaded note
    // Looping through IDs to load
    for (let i = localStorage.getItem("note-count") - 1; i >= 0; i--) {
      // Getting specific note ID values
      let title = localStorage.getItem("note-id-" + i + "-title");
      let context = localStorage.getItem("note-id-" + i + "-context");

      let noteDOM = (
        <div className="note-style" key={i}>
          <div>
            <b>Title</b>
          </div>
          <div>{title}</div>
          <br />
          <div>
            <b>Context</b>
          </div>
          <div>{context}</div>
        </div>
      );

      // skipping over empty id 0
      //if (noteID > 0) {
      loadedNotes.push(noteDOM); // adding to the loaded notes
      //}
    }

    return loadedNotes;
  }
}
