// example boilerplate

import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './../colors';
import toastr from 'toastr';
import alertify from 'alertifyjs';



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
        <input type='text' value={this.state.text} onChange={this.handleText} />
      </div>
    );
  }

  handleText = e => this.setState({ text: e.target.value });
  

  toast () {
    toastr.info(String(this.state.text));
  }
}