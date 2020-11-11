import React from "react";
import { pathname, expand, renderPage } from "./main.js";

export class ReviewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { response: "" };
  }

  componentDidMount() {}

  render() {
    let progress = localStorage.getItem(pathname + "note-review-progress");
    let total = localStorage.getItem(pathname + "note-review-total");

    let listBars = []; // where bars will be loaded
    let length = "" + (100 / parseFloat(total) - 1) + "%";
    let ratio = parseFloat(progress) / parseFloat(total);
    let ratioString = Math.round(100 * ratio);

    // Default message
    let reviewMessage =
      "You've completed " +
      progress +
      " out of " +
      total +
      " notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    if (ratio > 0.25) {
      reviewMessage =
        "Good job! You're making more progress with " +
        ratioString +
        "% completed! That's " +
        progress +
        " out of " +
        total +
        " notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }
    if (ratio > 0.5) {
      reviewMessage =
        "Wow! You're already half way there with " +
        ratioString +
        "% reviewed! Amazing, now you've studied " +
        progress +
        " out of " +
        total +
        " notes. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }
    if (ratio > 0.75) {
      reviewMessage =
        "Almost done! " +
        ratioString +
        "% is a great amount of progress that has been made! Not that many notes left! " +
        progress +
        " out of " +
        total +
        " notes are completed! Keep it up! When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }
    if (ratio === 1) {
      reviewMessage =
        "Congratulations! You've done it! " +
        ratioString +
        "%!!! Yup, thats a total of " +
        total +
        " reviewed notes! Feel free to continue studying as much as you would like. There's never enough knowledge to learn! As Benjamin Franklin once said, 'An investment in knowledge pays the best interest'. When reviewing notes, make sure to click the in-progress button to change the note's review status to complete. Then, you may return here to keep track of what progress you have made!";
    }

    for (let i = 0; i < total; i++) {
      let barDOM = (
        <div
          key={i}
          style={{
            float: "left",
            width: length,
            minWidth: "5px",
            height: "20px",
            border: "1px solid #dedede",
            backgroundColor: "#aad681",
            borderRadius: "10px",
            marginRight: "0.5%",
          }}
        ></div>
      );
      if (i >= progress) {
        barDOM = (
          <div
            key={i}
            style={{
              float: "left",
              width: length,
              minWidth: "5px",
              height: "20px",
              border: "1px solid #dedede",
              borderRadius: "10px",
              marginRight: "0.5%",
            }}
          ></div>
        );
      }
      listBars.push(barDOM);
    }

    return (
      <div>
        <div className="note-review-title">
          Review Notes{" "}
          <button
            className="display-expand"
            onClick={() => expand("display-review")}
          >
            <div id="display-review-text">Hide</div>
          </button>
        </div>
        <div id="display-review">
          <div>How many days do you want for review?</div>
          <button
            className="note-review-button-days"
            onClick={() => setReview(2)}
          >
            2
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(3)}
          >
            3
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(4)}
          >
            4
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(5)}
          >
            5
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(6)}
          >
            6
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(7)}
          >
            7
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(8)}
          >
            8
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(9)}
          >
            9
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(10)}
          >
            10
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(11)}
          >
            11
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(12)}
          >
            12
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(13)}
          >
            13
          </button>
          <button
            className="note-review-button-days"
            onClick={() => setReview(14)}
          >
            14
          </button>
          {total !== "0" && (
            <div className="note-review-info">
              <br />
              <button
                className="note-review-button-disable"
                onClick={() => removeReview()}
              >
                Disabled Review Feature
              </button>
              <br />
              <div style={{ marginTop: "20px" }}>
                {listBars}
                <span style={{ color: "white" }}>review</span>
              </div>
              <br />
              <div className="note-review-info-text">{reviewMessage}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Changes review setting
 * @param {integer} days id of the note to be changed
 **/
function setReview(days) {
  let date = new Date();

  // Getting number of active notes
  let activeNotes = 0;
  // Getting specific note ID values
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    if (
      localStorage.getItem(pathname + "note-id-" + i + "-visibility") === "true"
    ) {
      activeNotes++;
    }
  }
  localStorage.setItem(pathname + "note-review-total", activeNotes);

  // Making sure days don't exceed notes - defaults to 1 note per day
  if (days > activeNotes) {
    days = activeNotes;
  }

  let perDay = Math.floor(activeNotes / days); // how many notes to load per day
  let separator = 0; // how many days to increment by, from the original
  let counted = 0; // number of cards that have been assigned

  // Resetting sort
  localStorage.setItem(pathname + "note-sort", "none");
  // Getting specific note ID values
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    if (
      localStorage.getItem(pathname + "note-id-" + i + "-visibility") === "true"
    ) {
      let date2 = new Date();
      date2.setDate(date.getDate() + separator);
      localStorage.setItem(
        pathname + "note-id-" + i + "-review",
        date2.toDateString()
      );

      // Properly adjusting perDay to assign optimal amount of cards for each day
      if (separator > days - 1 - (activeNotes % days)) {
        perDay = Math.floor(activeNotes / days) + 1;
      }

      counted++; // card has been assigned
      if (counted % perDay === 0) {
        separator++; // increases the date
        counted = 0;
      }
    }
  }

  // Refreshing page classes
  renderPage();
}

/**
 * Changes review setting
 **/
export function removeReview() {
  // Getting specific note ID values
  for (let i = localStorage.getItem(pathname + "note-count") - 1; i >= 0; i--) {
    localStorage.setItem(pathname + "note-id-" + i + "-review", "");
    localStorage.setItem(pathname + "note-id-" + i + "-checked", "false");
  }

  // Reseting review values
  localStorage.setItem(pathname + "note-review-progress", 0);
  localStorage.setItem(pathname + "note-review-total", 0);

  // Refreshing page classes
  renderPage();
}
