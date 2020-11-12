import React from "react";
import ReactDOM from "react-dom";
import { Title } from "./title.js";
import { ReviewNotes } from "./review.js";
import { CreateNote } from "./create.js";
import { Folder } from "./folder.js";
import { SortNotes } from "./sort.js";
import { LoadNotes } from "./notes.js";

// Getting custom pathname that will allow for multiple folders
export let pathname = localStorage.getItem("note-folder-history");

/**
 * Preventing Site/Page Refresh when entering form
 **/
export let noRefresh = function (e) {
  e.preventDefault();
};

/**
 * Show / Hide a feature
 * @param {string} id id of the DOM class to be changed
 **/
export function expand(id) {
  if (document.getElementById(id).style.display === "none") {
    document.getElementById(id).style.display = "inline";
    document.getElementById(id + "-text").innerHTML = "Hide";
  } else {
    document.getElementById(id).style.display = "none";
    document.getElementById(id + "-text").innerHTML = "Show";
  }
}

/**
 * Re-renders all of the class components
 **/
export function renderPage() {
  // Refreshing review
  ReactDOM.render(<Title />, document.getElementById("title"));
  // Refreshing review
  ReactDOM.render(<ReviewNotes />, document.getElementById("review-notes"));
  // Refreshing CreateNote - Updates newNoteID Value
  ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
  // Refreshing folder
  ReactDOM.render(<Folder />, document.getElementById("folder-notes"));
  // Refreshing sort
  ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
}
