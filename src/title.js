import React from "react";
import { pathname } from "./main.js";

export class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    setTimeout(() => {
      document.getElementById("title-text").innerHTML = "Develop";
    }, 2000);
    setTimeout(() => {
      document.getElementById("title-text").innerHTML = "Retain";
    }, 4000);
    return (
      <div className="title-container">
        <div className="title-text-1" id="title-text">
          Record
        </div>
        <div className="title-text-2">your own knowledge</div>
        <div className="title-text-3" style={{ marginTop: "20px" }}>
          Create and Review notes, sort by difficulty,
        </div>
        <div className="title-text-3">
          and receive unique user-based suggestions.
        </div>
      </div>
    );
  }
}

// Storing Recent Folder History
if (localStorage.getItem("note-folder-history-1", "") === null) {
  localStorage.setItem("note-folder-history", "notes");
  localStorage.setItem("note-folder-history-1", "notes");
  localStorage.setItem("note-folder-history-2", "");
  localStorage.setItem("note-folder-history-3", "");
  localStorage.setItem("note-folder-history-4", "");
  localStorage.setItem("note-folder-history-5", "");
}

// Checking to see if there is a new folder
if (
  localStorage.getItem("note-folder-history-1") === pathname ||
  localStorage.getItem("note-folder-history-2") === pathname ||
  localStorage.getItem("note-folder-history-3") === pathname ||
  localStorage.getItem("note-folder-history-4") === pathname ||
  localStorage.getItem("note-folder-history-5") === pathname
) {
  // if there are no new folders, do nothing
} else {
  // Otherwise, Updating Recent Folder History
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
