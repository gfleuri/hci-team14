import React from "react";
import ReactDOM from "react-dom";

// Initializng counter for amount of notes
if (localStorage.getItem("note-count") === null) {
  localStorage.setItem("note-count", 0);
  localStorage.setItem("note-sort", "none");
}

function changeSort(difficulty) {
  // Setting new sort
  localStorage.setItem("note-sort", difficulty);

  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
}

function changeDifficulty(id, difficulty) {
  // Setting new difficulty
  localStorage.setItem("note-id-" + id + "-difficulty", difficulty);

  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
}

// Preventing Site/Page Refresh when entering form
let noRefresh = function (e) {
  e.preventDefault();
};

function clearAll() {
  localStorage.clear();
  localStorage.setItem("note-count", 0);
  localStorage.setItem("note-sort", "none");
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
  localStorage.setItem("note-id-" + newNoteID + "-difficulty", "Medium");

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

function loadNotes() {
  let loadedNotes = []; // Will Store each loaded note
  // Looping through IDs to load
  for (let i = localStorage.getItem("note-count") - 1; i >= 0; i--) {
    // Getting specific note ID values
    let title = localStorage.getItem("note-id-" + i + "-title");
    let context = localStorage.getItem("note-id-" + i + "-context");
    let difficulty = localStorage.getItem("note-id-" + i + "-difficulty");
    let search =
      "https://www.youtube.com/results?search_query=" + title.replace(" ", "+");

    let noteDOM = (
      <div className="note-style" key={i}>
        <div style={{ float: "right" }}>
          <button onClick={() => changeDifficulty(i, "Easy")}>Easy</button>
          <button onClick={() => changeDifficulty(i, "Medium")}>Medium</button>
          <button onClick={() => changeDifficulty(i, "Hard")}>Hard</button>
        </div>
        <div>
          <b>Difficulty: {difficulty}</b>
        </div>
        <br />
        <div>
          <b>Title</b>
        </div>
        <div>{title}</div>
        <br />
        <div>
          <b>Context</b>
        </div>
        <div>{context}</div>
        <br />
        <div>
          <b>Suggestions</b>
        </div>
        <div>
          <a href={search} style={{ marginLeft: "10px" }}>
            Note to YouTube
          </a>
        </div>
      </div>
    );

    if (localStorage.getItem("note-sort") === "Easy") {
      if (difficulty === "Easy") {
        loadedNotes.push(noteDOM); // add easy cards
      }
    } else if (localStorage.getItem("note-sort") === "Medium") {
      if (difficulty === "Medium") {
        loadedNotes.push(noteDOM); // add easy cards
      }
    } else if (localStorage.getItem("note-sort") === "Hard") {
      if (difficulty === "Hard") {
        loadedNotes.push(noteDOM); // add easy cards
      }
    } else {
      loadedNotes.push(noteDOM); // adding to the loaded notes
    }
  }
  return loadedNotes;
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
        <button onClick={() => changeSort("none")}>Show All</button>
        <button onClick={() => changeSort("Easy")}>Sort Easy</button>
        <button onClick={() => changeSort("Medium")}>Sort Medium</button>
        <button onClick={() => changeSort("Hard")}>Sort Hard</button>
        <button onClick={() => changeSort("Rank")}>Sort Ranked</button>
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

    if (localStorage.getItem("note-sort") === "Rank") {
      localStorage.setItem("note-sort", "Hard");
      loadedNotes.push(loadNotes());
      localStorage.setItem("note-sort", "Medium");
      loadedNotes.push(loadNotes());
      localStorage.setItem("note-sort", "Easy");
      loadedNotes.push(loadNotes());
    } else {
      loadedNotes = loadNotes();
    }

    return loadedNotes;
  }
}
