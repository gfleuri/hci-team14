import React from "react";
import ReactDOM from "react-dom";
import { Title } from "./title.js";
import { ReviewNotes } from "./review.js";
import { CreateNote } from "./create.js";
import { Folder } from "./folder.js";
import { SortNotes } from "./sort.js";
import { LoadNotes } from "./notes.js";
import { pathname } from "./main.js";

// Initializng counter for amount of notes and sort type
if (localStorage.getItem(pathname + "note-count") === null) {
  localStorage.setItem(pathname + "note-count", 0);
  localStorage.setItem(pathname + "note-loaded", 0);
  localStorage.setItem(pathname + "note-sort", "none");
  localStorage.setItem(pathname + "note-review-progress", 0);
  localStorage.setItem(pathname + "note-review-total", 0);
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

// Rendering all of the Class Components
ReactDOM.render(<Title />, document.getElementById("title"));
ReactDOM.render(<ReviewNotes />, document.getElementById("review-notes"));
ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
ReactDOM.render(<Folder />, document.getElementById("folder-notes"));
ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
