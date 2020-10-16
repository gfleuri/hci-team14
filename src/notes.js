import React from "react";
import ReactDOM from "react-dom";

// Initializing if null
if (localStorage.getItem("active-notes") === null) {
  localStorage.setItem("active-notes", "0");
}
// Initializng
let noteListSize = localStorage.getItem("active-notes").split(" ").length;

// Preventing Site/Page Refresh when entering form
let noRefresh = function (e) {
  e.preventDefault();
};

function clearAll() {
  localStorage.clear();
  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
}

// Adding NEW notes
function addNote() {
  // Create new note ID
  let newNoteID = noteListSize;

  // Add new note to actives
  localStorage.setItem(
    "active-notes",
    localStorage.getItem("active-notes") + " " + newNoteID
  );

  // Store new note data
  localStorage.setItem(
    "note-id-" + newNoteID + "-title",
    document.getElementById("title-" + newNoteID).value
  );
  localStorage.setItem(
    "note-id-" + newNoteID + "-context",
    document.getElementById("context-" + newNoteID).value
  );

  // Resetting text boxes
  document.getElementById("title-" + newNoteID).value = "";
  document.getElementById("context-" + newNoteID).value = "";

  noteListSize++; // increasing counter

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
    let newNoteID = noteListSize;
    let title = "title-" + newNoteID;
    let context = "context-" + newNoteID;
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
    // Initializing if null
    if (localStorage.getItem("active-notes") === null) {
      localStorage.setItem("active-notes", "0");
    }

    // Getting active note IDs to load
    let noteIDsToLoad = localStorage.getItem("active-notes").split(" ");

    let loadedNotes = []; // Will Store each loaded note

    // Looping through IDs to load
    for (let i = noteIDsToLoad.length - 1; i > 0; i--) {
      // Getting the IDs
      let noteID = noteIDsToLoad[i];

      // Getting specific note ID values
      let title = localStorage.getItem("note-id-" + noteID + "-title");
      let context = localStorage.getItem("note-id-" + noteID + "-context");

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
      if (noteID > 0) {
        loadedNotes.push(noteDOM); // adding to the loaded notes
      }
    }

    return loadedNotes;
  }
}
