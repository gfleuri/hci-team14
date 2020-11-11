import React from "react";
import ReactDOM from "react-dom";
import { Title } from "./title.js";
import { ReviewNotes } from "./review.js";
import { CreateNote } from "./create.js";
import { Folder } from "./folder.js";
import { SortNotes } from "./sort.js";
import { LoadNotes } from "./notes.js";

ReactDOM.render(<Title />, document.getElementById("title"));
ReactDOM.render(<ReviewNotes />, document.getElementById("review-notes"));
ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
ReactDOM.render(<Folder />, document.getElementById("folder-notes"));
ReactDOM.render(<SortNotes />, document.getElementById("sort-notes"));
ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
