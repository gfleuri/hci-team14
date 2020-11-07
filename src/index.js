import React from "react";
import ReactDOM from "react-dom";
import { CreateNote, Folder } from "./notes.js";
import { LoadNotes } from "./notes.js";
import { ReviewNotes } from "./notes.js";
import { SortNotes } from "./notes.js";
import { Title } from "./title.js";

ReactDOM.render(<Title />, document.getElementById("title"));
ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
ReactDOM.render(<ReviewNotes />, document.getElementById("review-notes"));
ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
ReactDOM.render(<Folder />, document.getElementById("folder-notes"));
