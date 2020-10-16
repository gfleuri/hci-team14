import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import { LoadNotes } from "./notes.js";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<LoadNotes />, document.getElementById("load-notes"));
