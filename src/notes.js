import React from "react";

export class CreateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>Create a note</div>
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
    // Store Data
    localStorage.setItem("active-notes", "1 2");

    // Example Data for note 1
    localStorage.setItem("note-id-1-title", "Topic 1");
    localStorage.setItem("note-id-1-context", "This is my note for topic 1");

    // Example Data for note 2
    localStorage.setItem("note-id-2-title", "Topic 2");
    localStorage.setItem("note-id-2-context", "Wow such cool much awesome");

    // Getting active note IDs to load
    let noteIDsToLoad = localStorage.getItem("active-notes").split(" ");
    console.log(noteIDsToLoad);

    let loadedNotes = []; // Will Store each loaded note

    for (let i = 0; i < noteIDsToLoad.length; i++) {
      // Getting the IDs
      let noteID = noteIDsToLoad[i];

      // Getting specific note ID values
      let title = localStorage.getItem("note-id-" + noteID + "-title");
      let context = localStorage.getItem("note-id-" + noteID + "-context");

      let noteDOM = (
        <div className="note-style">
          <div>{title}</div>
          <div>{context}</div>
        </div>
      );

      loadedNotes.push(noteDOM); // adding to the loaded notes
    }

    return loadedNotes;
  }
}
