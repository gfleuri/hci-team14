import React from "react";
import ReactDOM from "react-dom";
import { ReviewNotes } from "./review.js";
import { CreateNote } from "./create.js";
import { Folder } from "./folder.js";
import { SortNotes } from "./sort.js";
import { LoadNotes } from "./notes.js";

export let pathname = localStorage.getItem("note-folder-history");

// Preventing Site/Page Refresh when entering form
export let noRefresh = function (e) {
  e.preventDefault();
};

export function expand(id) {
  if (document.getElementById(id).style.display === "none") {
    document.getElementById(id).style.display = "inline";
    document.getElementById(id + "-text").innerHTML = "Hide";
  } else {
    document.getElementById(id).style.display = "none";
    document.getElementById(id + "-text").innerHTML = "Show";
  }
}

export function renderPage() {
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
