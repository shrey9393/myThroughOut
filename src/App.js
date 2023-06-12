import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  c = "john";
  render() {
    return <div>class based Component {this.c}</div>;
  }
}
