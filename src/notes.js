import React from "react";
import ReactDOM from "react-dom";

// Storing Recent Folder History
if (localStorage.getItem("note-folder-history-1", "") === null) {
  localStorage.setItem("note-folder-history", "notes");
  localStorage.setItem("note-folder-history-1", "notes");
  localStorage.setItem("note-folder-history-2", "");
  localStorage.setItem("note-folder-history-3", "");
  localStorage.setItem("note-folder-history-4", "");
  localStorage.setItem("note-folder-history-5", "");
}

let pathname = localStorage.getItem("note-folder-history");

if (
  localStorage.getItem("note-folder-history-1") === pathname ||
  localStorage.getItem("note-folder-history-2") === pathname ||
  localStorage.getItem("note-folder-history-3") === pathname ||
  localStorage.getItem("note-folder-history-4") === pathname ||
  localStorage.getItem("note-folder-history-5") === pathname
) {
  // do nothing
} else {
  localStorage.setItem(
    "note-folder-history-5",
    localStorage.getItem("note-folder-history-4")
  );
  localStorage.setItem(
    "note-folder-history-4",
    localStorage.getItem("note-folder-history-3")
  );
  localStorage.setItem(
    "note-folder-history-3",
    localStorage.getItem("note-folder-history-2")
  );
  localStorage.setItem(
    "note-folder-history-2",
    localStorage.getItem("note-folder-history-1")
  );
  localStorage.setItem("note-folder-history-1", pathname);
}

// Initializng counter for amount of notes and sort type
if (localStorage.getItem(pathname + "note-count") === null) {
  localStorage.setItem(pathname + "note-count", 0);
  localStorage.setItem(pathname + "note-loaded", 0);
  localStorage.setItem(pathname + "note-sort", "none");
  localStorage.setItem(pathname + "note-review-progress", 0);
  localStorage.setItem(pathname + "note-review-total", 0);
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

// Preventing Site/Page Refresh when entering form
let noRefresh = function (e) {
  e.preventDefault();
};

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
 * Creates a new note
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

function openFolder(name) {
  localStorage.setItem("note-folder-history", name);
  // eslint-disable-next-line
  window.location.pathname = window.location.pathname;
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
        loadedNotes.push(noteDOM); // add easy cards
      }
    } else if (localStorage.getItem(pathname + "note-sort") === "Hard") {
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

  // Getting number of active notes
  let activeNotes = 0;
  // Getting specific note ID values
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    if (
      localStorage.getItem(pathname + "note-id-" + i + "-visibility") === "true"
    ) {
      activeNotes++;
    }
  }
  localStorage.setItem(pathname + "note-review-total", activeNotes);

  // Making sure days don't exceed notes - defaults to 1 note per day
  if (days > activeNotes) {
    days = activeNotes;
  }

  let perDay = Math.floor(activeNotes / days); // how many notes to load per day
  let separator = 0; // how many days to increment by, from the original
  let counted = 0; // number of cards that have been assigned

  // Resetting sort
  localStorage.setItem(pathname + "note-sort", "none");
  // Getting specific note ID values
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    if (
      localStorage.getItem(pathname + "note-id-" + i + "-visibility") === "true"
    ) {
      let date2 = new Date();
      date2.setDate(date.getDate() + separator);
      localStorage.setItem(
        pathname + "note-id-" + i + "-review",
        date2.toDateString()
      );

      // Properly adjusting perDay to assign optimal amount of cards for each day
      if (separator > days - 1 - (activeNotes % days)) {
        perDay = Math.floor(activeNotes / days) + 1;
      }

      counted++; // card has been assigned
      if (counted % perDay === 0) {
        separator++; // increases the date
        counted = 0;
      }
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
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    localStorage.setItem(pathname + "note-id-" + i + "-review", "");
    localStorage.setItem(pathname + "note-id-" + i + "-checked", "false");
  }

  // Reseting review values
  localStorage.setItem(pathname + "note-review-progress", 0);
  localStorage.setItem(pathname + "note-review-total", 0);

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

function renderPage() {
  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
  // Refreshing review
  ReactDOM.render(<ReviewNotes />, document.getElementById("review-notes"));
  // Refreshing sort
  ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
  // Refreshing sort
  ReactDOM.render(<Folder />, document.getElementById("folder-notes"));
}

export class ReviewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let progress = localStorage.getItem(pathname + "note-review-progress");
    let total = localStorage.getItem(pathname + "note-review-total");

    let listBars = []; // where bars will be loaded
    let length = "" + (100 / parseFloat(total) - 1) + "%";
    let ratio = parseFloat(progress) / parseFloat(total);
    let ratioString = Math.round(100 * ratio);

    // Default message
    let reviewMessage =
      "You've completed " +
      progress +
      " out of " +
      total +
      " notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    if (ratio > 0.25) {
      reviewMessage =
        "Good job! You're making more progress with " +
        ratioString +
        "% completed! That's " +
        progress +
        " out of " +
        total +
        " notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }
    if (ratio > 0.5) {
      reviewMessage =
        "Wow! You're already half way there with " +
        ratioString +
        "% reviewed! Amazing, now you've studied " +
        progress +
        " out of " +
        total +
        " notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }
    if (ratio > 0.75) {
      reviewMessage =
        "Almost done! " +
        ratioString +
        "% is a great amount of progress that has been made! Not that many notes left! " +
        progress +
        " out of " +
        total +
        " notes are completed! Keep it up! When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }
    if (ratio === 1) {
      reviewMessage =
        "Congratulations! You've done it! " +
        ratioString +
        "%!!! Yup, thats a total of " +
        total +
        " reviewed notes! Feel free to continue studying as much as you would like. There's never enough knowledge to learn! As Benjamin Franklin once said, 'An investment in knowledge pays the best interest'. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }

    for (let i = 0; i < total; i++) {
      let barDOM = (
        <div
          key={i}
          style={{
            float: "left",
            width: length,
            minWidth: "5px",
            height: "20px",
            border: "1px solid #dedede",
            backgroundColor: "#aad681",
            borderRadius: "10px",
            marginRight: "0.5%",
          }}
        ></div>
      );
      if (i >= progress) {
        barDOM = (
          <div
            key={i}
            style={{
              float: "left",
              width: length,
              minWidth: "5px",
              height: "20px",
              border: "1px solid #dedede",
              borderRadius: "10px",
              marginRight: "0.5%",
            }}
          ></div>
        );
      }
      listBars.push(barDOM);
    }

    return (
      <div>
        <div className="note-review-title">Review Notes</div>
        <div>How many days do you want for review?</div>
        <button
          className="note-review-button-days"
          onClick={() => setReview(2)}
        >
          2
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(3)}
        >
          3
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(4)}
        >
          4
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(5)}
        >
          5
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(6)}
        >
          6
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(7)}
        >
          7
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(8)}
        >
          8
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(9)}
        >
          9
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(10)}
        >
          10
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(11)}
        >
          11
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(12)}
        >
          12
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(13)}
        >
          13
        </button>
        <button
          className="note-review-button-days"
          onClick={() => setReview(14)}
        >
          14
        </button>
        {total !== "0" && (
          <div className="note-review-info">
            <br />
            <button
              className="note-review-button-disable"
              onClick={() => removeReview()}
            >
              Disabled Review Feature
            </button>
            <br />
            <div style={{ marginTop: "20px" }}>
              {listBars}
              <span style={{ color: "white" }}>review</span>
            </div>
            <br />
            <div className="note-review-info-text">{reviewMessage}</div>
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
    let size = localStorage.getItem(pathname + "note-loaded");

    return (
      <div>
        <div className="note-sort-title">Sort Notes ({size})</div>
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
    );
  }
}

export class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let history1 = localStorage.getItem("note-folder-history-1");
    let history2 = localStorage.getItem("note-folder-history-2");
    let history3 = localStorage.getItem("note-folder-history-3");
    let history4 = localStorage.getItem("note-folder-history-4");
    let history5 = localStorage.getItem("note-folder-history-5");

    return (
      <div>
        <div className="note-folder-title">Folders</div>
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
    let title = "title-" + localStorage.getItem(pathname + "note-count");
    let context = "context-" + localStorage.getItem(pathname + "note-count");
    return (
      <div>
        <div className="note-create-title">Create Notes</div>
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
