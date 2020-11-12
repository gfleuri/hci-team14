import React from "react";
import { removeReview } from "./review.js";
import { pathname, renderPage } from "./main.js";

export class LoadNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let loadedNotes = []; // Will Store each loaded note

    if (localStorage.getItem(pathname + "note-sort") === "Rank") {
      localStorage.setItem(pathname + "note-sort", "Hard");
      loadedNotes.push(loadNotes());
      localStorage.setItem(pathname + "note-sort", "Medium");
      loadedNotes.push(loadNotes());
      localStorage.setItem(pathname + "note-sort", "Easy");
      loadedNotes.push(loadNotes());
      localStorage.setItem(pathname + "note-sort", "Rank");
    } else {
      loadedNotes = [loadNotes()];
    }

    // Counting number of notes loaded
    let counter = 0;
    for (let i = 0; i < loadedNotes.length; i++) {
      counter += loadedNotes[i].length;
    }
    localStorage.setItem(pathname + "note-loaded", counter);

    // Returning the notes to be loaded
    return loadedNotes;
  }
}

/**
 * Changes a notes difficulty
 * @param {integer} id id of the note to be changed
 * @param {string} difficulty notes type of new difficulty
 **/
function changeDifficulty(id, difficulty) {
  // Setting new difficulty
  localStorage.setItem(pathname + "note-id-" + id + "-difficulty", difficulty);

  // Refreshing page classes
  renderPage();
}

/**
 * Edits a new note
 * @param {integer} i id of the note to be deleted
 **/
function editNote(i) {
  window.scrollTo(0, 0);
  document.getElementById(
    "title-" + localStorage.getItem(pathname + "note-count")
  ).value = localStorage.getItem(pathname + "note-id-" + i + "-title");
  document.getElementById(
    "context-" + localStorage.getItem(pathname + "note-count")
  ).value = localStorage.getItem(pathname + "note-id-" + i + "-context");
  deleteNote(i);
  removeReview();

  // change note visibility
  localStorage.setItem(pathname + "note-id-" + i + "-visibility", "false");
  // Refreshing page classes
  renderPage();
}

/**
 * Deletes a note
 * @param {integer} i id of the note to be deleted
 **/
function deleteNote(i) {
  // change note visibility
  localStorage.setItem(pathname + "note-id-" + i + "-visibility", "false");
  removeReview();
  // Refreshing page classes
  renderPage();
}

/**
 * Changes the progress of a note
 * @param {integer} i id of the note to be changed
 * @param {string} value value of progress
 **/
function changeProgress(i, value) {
  localStorage.setItem(pathname + "note-id-" + i + "-checked", value);

  if (value === "true") {
    // note is completed
    localStorage.setItem(
      pathname + "note-review-progress",
      parseInt(localStorage.getItem(pathname + "note-review-progress")) + 1
    );
  } else {
    localStorage.setItem(
      pathname + "note-review-progress",
      parseInt(localStorage.getItem(pathname + "note-review-progress")) - 1
    );
  }

  // Refreshing page classes
  renderPage();
}

/**
 * Returns all of the notes to be loaded
 **/
function loadNotes() {
  let loadedNotes = []; // Will Store each loaded note
  // Looping through IDs to load
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    // Skips "Deleted" Notes
    let visibility = localStorage.getItem(
      pathname + "note-id-" + i + "-visibility"
    );
    if (visibility !== "true") {
      continue;
    }

    // Getting specific note ID values
    let title = localStorage.getItem(pathname + "note-id-" + i + "-title");
    let context = localStorage.getItem(pathname + "note-id-" + i + "-context");
    let difficulty = localStorage.getItem(
      pathname + "note-id-" + i + "-difficulty"
    );
    let review = localStorage.getItem(pathname + "note-id-" + i + "-review");
    let checked = localStorage.getItem(pathname + "note-id-" + i + "-checked");
    let search =
      "https://www.youtube.com/results?search_query=" + title.replace(" ", "+");
    let searchGoogle =
      "https://www.google.com/search?q=site:edu+" + title.replace(" ", "+");
    let searchKhan =
      "https://www.khanacademy.org/search?referer=%2F&page_search_query=" +
      title.replace(" ", "+");

    let noteDOM = (
      <div className="note-style" key={i}>
        <div className="note-difficulty-button-container">
          <button
            className="note-button-easy"
            onClick={() => changeDifficulty(i, "Easy")}
          >
            Easy
          </button>
          <button
            className="note-button-medium"
            onClick={() => changeDifficulty(i, "Medium")}
          >
            Medium
          </button>
          <button
            className="note-button-hard"
            onClick={() => changeDifficulty(i, "Hard")}
          >
            Hard
          </button>
        </div>
        <div className="note-difficulty">
          {difficulty === "Easy" && (
            <div
              style={{
                float: "left",
                border: "1px solid #dedede",
                width: "10px",
                height: "10px",
                borderRadius: "5px",
                marginTop: "2.5px",
                marginRight: "5px",
                backgroundColor: "#88fb91",
              }}
            ></div>
          )}
          {difficulty === "Medium" && (
            <div
              style={{
                float: "left",
                border: "1px solid #dedede",
                width: "10px",
                height: "10px",
                borderRadius: "5px",
                marginTop: "2.5px",
                marginRight: "5px",
                backgroundColor: "#ecc864",
              }}
            ></div>
          )}
          {difficulty === "Hard" && (
            <div
              style={{
                float: "left",
                border: "1px solid #dedede",
                width: "10px",
                height: "10px",
                borderRadius: "5px",
                marginTop: "2.5px",
                marginRight: "5px",
                backgroundColor: "#c26660",
              }}
            ></div>
          )}
          Difficulty: {difficulty}
        </div>
        {review !== "" && (
          <div>
            <br />
            <b>Review by {review}</b>
            {checked === "false" && (
              <div className="note-progress-button-container">
                <button
                  className="note-button-progress"
                  onClick={() => changeProgress(i, "true")}
                >
                  In Progress
                </button>
              </div>
            )}
            {checked === "true" && (
              <div className="note-progress-button-container">
                <button
                  className="note-button-complete"
                  onClick={() => changeProgress(i, "false")}
                >
                  Completed
                </button>
              </div>
            )}
          </div>
        )}
        <br />
        <div className="note-title">{title}</div>
        <br />
        <div className="note-context">{context}</div>
        <br />
        <div>Suggestions</div>
        <br />
        <div>
          <a href={search} className="note-youtube-link">
            <div className="note-youtube-link-context">YouTube Video</div>
          </a>

          <a href={searchGoogle} className="note-google-link">
            <div className="note-google-link-context">Google Edu</div>
          </a>

          <a href={searchKhan} className="note-khan-link">
            <div className="note-khan-link-context">Khan Acad</div>
          </a>
        </div>
        <br />
        <div>Configuration</div>
        <br />
        <button className="note-button-edit" onClick={() => editNote(i)}>
          Edit
        </button>
        <button className="note-button-delete" onClick={() => deleteNote(i)}>
          Delete
        </button>
      </div>
    );

    if (localStorage.getItem(pathname + "note-sort") === "Easy") {
      if (difficulty === "Easy") {
        loadedNotes.push(noteDOM); // add easy cards
      }
    } else if (localStorage.getItem(pathname + "note-sort") === "Medium") {
      if (difficulty === "Medium") {
        loadedNotes.push(noteDOM); // add medium cards
      }
    } else if (localStorage.getItem(pathname + "note-sort") === "Hard") {
      if (difficulty === "Hard") {
        loadedNotes.push(noteDOM); // add hard cards
      }
    } else {
      loadedNotes.push(noteDOM); // adding to the loaded notes
    }
  }
  return loadedNotes;
}
