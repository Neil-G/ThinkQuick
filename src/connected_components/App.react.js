// example boilerplate

import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './../colors';
import toastr from 'toastr';
import alertify from 'alertifyjs';


class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {;
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.text };
  }
  render() {
    console.log(this.state.text);
    return (
      <div>
        <h1> toastr </h1>
        <button onClick={ () => toastr.info(this.state.text) }> toaster </button>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        <input type='text' value={this.state.text} onChange={this.handleText} />
      </div>
    );
  }

  handleText = e => this.setState({ text: e.target.value });
  

  toast () {
    toastr.info(String(this.state.text));
  }
}