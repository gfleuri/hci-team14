import React from "react";
import ReactDOM from "react-dom";

// Initializng counter for amount of notes and sort type
if (localStorage.getItem("note-count") === null) {
  localStorage.setItem("note-count", 0);
  localStorage.setItem("note-sort", "none");
  localStorage.setItem("note-review-progress", 0);
  localStorage.setItem("note-review-total", 0);
}

/**
 * Changes how all of the notes will be sorted upon load
 * @param {string} difficulty type of new difficulty to sort by
 **/
function changeSort(difficulty) {
  // Setting new sort
  localStorage.setItem("note-sort", difficulty);

  // Refreshing page classes
  renderPage();
}

/**
 * Changes a notes difficulty
 * @param {integer} id id of the note to be changed
 * @param {string} difficulty notes type of new difficulty
 **/
function changeDifficulty(id, difficulty) {
  // Setting new difficulty
  localStorage.setItem("note-id-" + id + "-difficulty", difficulty);

  // Refreshing page classes
  renderPage();
}

// Preventing Site/Page Refresh when entering form
let noRefresh = function (e) {
  e.preventDefault();
};

/**
 * Removes all of the existing notes
 **/
function clearAll() {
  localStorage.clear();
  localStorage.setItem("note-count", 0);
  localStorage.setItem("note-sort", "none");
  localStorage.setItem("note-review-progress", 0);
  localStorage.setItem("note-review-total", 0);
  // Refreshing page classes
  renderPage();
}

/**
 * Creates a new note
 **/
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
  localStorage.setItem("note-id-" + newNoteID + "-review", "");
  localStorage.setItem("note-id-" + newNoteID + "-checked", "false");

  // Increasing note counter by 1, locStor returns string so must parse
  localStorage.setItem(
    "note-count",
    parseFloat(localStorage.getItem("note-count")) + 1
  );

  // Resetting text boxes
  document.getElementById("title-" + newNoteID).value = "";
  document.getElementById("context-" + newNoteID).value = "";

  // Refreshing page classes
  renderPage();
}

/**
 * Returns all of the notes to be loaded
 **/
function loadNotes() {
  let loadedNotes = []; // Will Store each loaded note
  // Looping through IDs to load
  for (let i = localStorage.getItem("note-count") - 1; i >= 0; i--) {
    // Getting specific note ID values
    let title = localStorage.getItem("note-id-" + i + "-title");
    let context = localStorage.getItem("note-id-" + i + "-context");
    let difficulty = localStorage.getItem("note-id-" + i + "-difficulty");
    let review = localStorage.getItem("note-id-" + i + "-review");
    let checked = localStorage.getItem("note-id-" + i + "-checked");
    let search =
      "https://www.youtube.com/results?search_query=" + title.replace(" ", "+");

    let noteDOM = (
      <div className="note-style" key={i}>
        <div style={{ float: "right" }}>
          <button onClick={() => changeDifficulty(i, "Easy")}>Easy</button>
          <button onClick={() => changeDifficulty(i, "Medium")}>Medium</button>
          <button onClick={() => changeDifficulty(i, "Hard")}>Hard</button>
        </div>
        <div
          style={{
            borderBottom: "1px solid #dedede",
            padding: "5px",
          }}
        >
          Difficulty: {difficulty}
        </div>
        {review !== "" && (
          <div>
            <br />
            <b>Review by {review}</b>
            {checked === "false" && (
              <div style={{ float: "right" }}>
                <button onClick={() => changeProgress(i, "true")}>
                  In Progress
                </button>
              </div>
            )}
            {checked === "true" && (
              <div style={{ float: "right" }}>
                <button onClick={() => changeProgress(i, "false")}>
                  Completed
                </button>
              </div>
            )}
          </div>
        )}
        <br />
        <div
          style={{
            padding: "5px",
          }}
        >
          Title: {title}
        </div>
        <br />
        <div
          style={{
            border: "1px solid #dedede",
            borderRadius: "5px",
            padding: "5px",
            minHeight: "50px",
          }}
        >
          {context}
        </div>
        <br />
        <div>Suggestions</div>
        <br />
        <div>
          <a href={search} style={{ marginLeft: "10px" }}>
            <div
              style={{
                border: "1px solid #dedede",
                borderRadius: "5px",
                padding: "5px",
                width: "110px",
                height: "20px",
              }}
            >
              YouTube Video
            </div>
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

/**
 * Changes review setting
 * @param {integer} days id of the note to be changed
 **/
function setReview(days) {
  let date = new Date();
  let separator = 0;
  let perDay = parseInt(localStorage.getItem("note-count") / days);
  if (localStorage.getItem("note-count") / days > perDay) {
    perDay++;
  }

  let activeNotes = 0;
  // Getting specific note ID values
  for (let i = localStorage.getItem("note-count") - 1; i >= 0; i--) {
    if (localStorage.getItem("note-id-" + i + "-visibility") === "true") {
      activeNotes++;
    }
  }
  localStorage.setItem("note-review-total", activeNotes);

  // Resetting sort
  localStorage.setItem("note-sort", "none");
  // Getting specific note ID values
  for (let i = localStorage.getItem("note-count") - 1; i >= 0; i--) {
    let date2 = new Date();
    date2.setDate(date.getDate() + separator);
    localStorage.setItem("note-id-" + i + "-review", date2.toDateString());
    if (i % perDay === 0) {
      separator++;
    }
  }

  // Refreshing page classes
  renderPage();
}

/**
 * Changes review setting
 **/
function removeReview() {
  // Getting specific note ID values
  for (let i = localStorage.getItem("note-count") - 1; i >= 0; i--) {
    localStorage.setItem("note-id-" + i + "-review", "");
    localStorage.setItem("note-id-" + i + "-checked", "false");
  }

  // Reseting review values
  localStorage.setItem("note-review-progress", 0);
  localStorage.setItem("note-review-total", 0);

  // Refreshing page classes
  renderPage();
}

/**
 * Changes the progress of a note
 * @param {integer} i id of the note to be changed
 * @param {string} value value of progress
 **/
function changeProgress(i, value) {
  localStorage.setItem("note-id-" + i + "-checked", value);

  if (value === "true") {
    // note is completed
    localStorage.setItem(
      "note-review-progress",
      parseInt(localStorage.getItem("note-review-progress")) + 1
    );
  } else {
    localStorage.setItem(
      "note-review-progress",
      parseInt(localStorage.getItem("note-review-progress")) - 1
    );
  }

  // Refreshing page classes
  renderPage();
}

function renderPage() {
  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
  // Refreshing review
  ReactDOM.render(<ReviewNotes />, document.getElementById("review-notes"));
  // Refreshing sort
  ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
}

export class ReviewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let progress = localStorage.getItem("note-review-progress");
    let total = localStorage.getItem("note-review-total");
    return (
      <div>
        <div style={{ marginBottom: "10px" }}>
          <b>Review Notes</b>
        </div>
        <div>How many days do you want for review?</div>
        <button onClick={() => setReview(2)}>2</button>
        <button onClick={() => setReview(3)}>3</button>
        <button onClick={() => setReview(4)}>4</button>
        <button onClick={() => setReview(5)}>5</button>
        <button onClick={() => setReview(6)}>6</button>
        <button onClick={() => setReview(7)}>7</button>
        <button onClick={() => setReview(8)}>8</button>
        <button onClick={() => setReview(9)}>9</button>
        <button onClick={() => setReview(10)}>10</button>
        <button onClick={() => setReview(11)}>11</button>
        <button onClick={() => setReview(12)}>12</button>
        <button onClick={() => setReview(13)}>13</button>
        <button onClick={() => setReview(14)}>14</button>
        {total !== "0" && (
          <div>
            <br />
            <button onClick={() => removeReview()}>
              Disabled Review Feature
            </button>
            <br />
            <br />
            <b>
              Progress {progress} / {total}
            </b>
          </div>
        )}
      </div>
    );
  }
}

export class SortNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div style={{ marginBottom: "10px" }}>
          <b>Sort Notes</b>
        </div>
        <button onClick={() => changeSort("none")}>Show All</button>
        <button onClick={() => changeSort("Easy")}>Sort Easy</button>
        <button onClick={() => changeSort("Medium")}>Sort Medium</button>
        <button onClick={() => changeSort("Hard")}>Sort Hard</button>
        <button onClick={() => changeSort("Rank")}>Sort Ranked</button>
      </div>
    );
  }
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
        <div style={{ marginBottom: "10px" }}>
          <b>Create Notes</b>
        </div>
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
