import React, { Component } from "react";

export default class Timer extends Component {
  state = { elapsed: 0 };

  componentDidMount() {
    this._id = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this._id);
  }

  tick = () => {
    const { start } = this.props;
    if (!start) {
      return;
    }

    this.setState({ elapsed: Date.now() - start });
  };

  render() {
    const hasStart = !!this.props.start;

    const ms = this.state.elapsed;
    return <p>timing: {hasStart ? ms : 0}ms</p>;
  }
}
