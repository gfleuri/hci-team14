import React from "react";
import ReactDOM from "react-dom";
import { CreateNote } from "./notes.js";
import { LoadNotes } from "./notes.js";

ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
ReactDOM.render(<CreateNote />, document.getElementById("create-note"));
