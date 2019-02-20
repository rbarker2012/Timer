import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      button: "Start",
      color: "black"
    };
  }

  tick = () => {
    if (this.state.seconds > 0) {
      this.setState({
        seconds: this.state.seconds - 1
      });
    } else if (this.state.minutes > 0) {
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: this.state.seconds + 59
      });
    } else if (this.state.seconds === 0) {
      this.setState({
        minutes: 0,
        seconds: 0,
        color: "#9E1B32"
      });
    }
  };

  start = () => {
    this.timerID = setInterval(() => this.tick(), 1000);
  };
  pause = () => {
    this.timerID = clearInterval(this.timerID);
  };

  change = () => {
    if (this.state.button === "Start") {
      this.start();
      this.setState({
        button: "Pause"
      });
    } else {
      this.pause();
      this.setState({
        button: "Start"
      });
    }
  };

  clear = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      button: "Start",
      color: "black"
    });
    this.pause;
    document.getElementById("minIn").value = "";
    document.getElementById("secIn").value = "";
  };

  render() {
    return (
      <div className="App">
        <div className="timer-container">
          <h1>Time</h1>
          <input id="minIn" type="number" placeholder="minutes" />
          <input id="secIn" type="number" placeholder="seconds" />
          <button
            onClick={() => {
              this.setState({
                minutes: document.getElementById("minIn").value,
                seconds: document.getElementById("secIn").value
              });
            }}
          >
            Set Time
          </button>
          <div className="time" style={{ color: this.state.color }}>
            {this.state.minutes}:
            {(this.state.seconds < 10 ? "0" : "") + this.state.seconds}
          </div>
          <button
            onClick={() => {
              this.change();
            }}
          >
            {this.state.button}
          </button>
          <button
            onClick={() => {
              this.clear();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
