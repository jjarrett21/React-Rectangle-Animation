import React, { Component } from "react";
import ReactDom from "react-dom";
import { Motion, spring } from "react-motion";
import { Stage, Layer, Rect, Transfromer } from "react-konva";

import "./styles.css";

import Timer from "./timer";
// import boxes from "./boxes.json";
const boxes = require("./boxes.json");

const initialState = { step: 0, stepStart: null };

var rects = [];

function rectMap() {
  boxes.box_set.forEach(input => {
    let newRects = {
      id: input["id"],
      width: input["width"],
      height: input["height"]
    };
    return rects.push(newRects);
  });
}

// class Rectangle extends Component {
//   render() {
//     return (
//       <Rect
//       x={this.props.x}
//       y={this.props.y}
//       width={this.props.width}
//       height={this.props.height}
//       />
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    rectMap();
  }
  state = { initialState, rects };

  changeStep = (step = 0) => {
    clearTimeout(this._id);

    this.setState({ step, stepStart: Date.now() });
    const { time } = boxes.box_set[step];
    const isLast = step === boxes.box_set.length - 1;

    console.log(boxes.box_set[0]);

    this._id = setTimeout(() => {
      if (isLast) {
        return this.setState(initialState);
      }

      this.changeStep(step - 1);
    }, time);
  };

  render() {
    const { step, stepStart } = this.state;
    const { id, startx, starty, endx = startx, endy = starty } = boxes.box_set[
      step
    ];

    return (
      <div className="App">
        <div style={{ marginTop: 10 }}>step:{step - 1}></div>
        <Timer start={stepStart} />

        <Motion
          defaultStyle={{ x: startx, y: starty }}
          style={{ x: spring(endx), y: spring(endy) }}
        >
          {({ x, y }) => (
            <div
              style={{
                transform: `translate(${x}px, ${y}px`
              }}
            >
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                  <button onClick={() => this.changeStep(0)}>Start</button>
                  {this.state.rects.map((r, i) => (
                    <Rect key={i} {...r} />
                  ))}
                </Layer>
              </Stage>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDom.render(<App />, rootElement);
