import React from "react";
import ReactDOM from "react-dom";
import { Title } from "./title.js";
import { ReviewNotes } from "./review.js";
import { CreateNote, addNote } from "./create.js";
import { Folder } from "./folder.js";
import { SortNotes } from "./sort.js";
import { LoadNotes } from "./notes.js";

// History null checks before giving pathname
if (
  localStorage.getItem("note-folder-history") === null ||
  localStorage.getItem("note-folder-history-1") === null ||
  localStorage.getItem("note-folder-history-2") === null ||
  localStorage.getItem("note-folder-history-3") === null ||
  localStorage.getItem("note-folder-history-4") === null ||
  localStorage.getItem("note-folder-history-5") === null
) {
  localStorage.setItem("note-folder-history", "notes");
  localStorage.setItem("note-folder-history-1", "notes");
  localStorage.setItem("note-folder-history-2", "");
  localStorage.setItem("note-folder-history-3", "");
  localStorage.setItem("note-folder-history-4", "");
  localStorage.setItem("note-folder-history-5", "");
}

if (localStorage.getItem("survey") === "true") {
  localStorage.setItem("note-folder-history", "biology");
  localStorage.setItem("note-folder-history-1", "biology");
  localStorage.setItem("note-folder-history-2", "");
  localStorage.setItem("note-folder-history-3", "");
  localStorage.setItem("note-folder-history-4", "");
  localStorage.setItem("note-folder-history-5", "");
  window.onload = function () {
    document.getElementById("survey-info").style.display = "block";

    let newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value = "smooth E.R.";
    document.getElementById("context-" + newNoteID).value =
      "Lipid synthesis Detoxifies drugs and poisons (liver cells)";
    addNote();

    newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value = "Golgi body";
    document.getElementById("context-" + newNoteID).value =
      "Stacked, flattened membranous sacs Modify, store, and ship products of the ER Package products into vessicles Important in secretion";
    addNote();

    newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value = "chloroplast";
    document.getElementById("context-" + newNoteID).value =
      "Site of photosynthesis Energy from sunlight converted into chemical energy of organic molecules";
    addNote();

    newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value = "nuclear envelope";
    document.getElementById("context-" + newNoteID).value =
      "Materials move between nucleus and cytoplasm through pores in the envelope Passage regulated by the size of the pores";
    addNote();

    newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value = "eukaryote";
    document.getElementById("context-" + newNoteID).value =
      "Nucleus Genetic material within nuclear envelope Contains membrane-bound organelles Fungi, Plants, Animals";
    addNote();

    newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value =
      "Spontaneous generation";
    document.getElementById("context-" + newNoteID).value =
      "thought on the ordinary formation of living organisms without descent from similar organisms";
    addNote();

    newNoteID = localStorage.getItem(pathname + "note-count");
    document.getElementById("title-" + newNoteID).value = "Cell";
    document.getElementById("context-" + newNoteID).value =
      "lowest level of structure capable of performing the activities of life";
    addNote();
    localStorage.removeItem("survey");
  };
} else if (localStorage.getItem("survey-info") === "true") {
  window.onload = function () {
    document.getElementById("survey-info").style.display = "block";
  };
}

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
  // Refreshing notes
  ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
  // Refreshing sort
  ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
}
