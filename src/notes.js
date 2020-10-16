import React from "react";

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

    return <div>Hello World!</div>;
  }
}
