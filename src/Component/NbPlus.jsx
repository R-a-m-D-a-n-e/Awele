import React, { Component } from "react";

export default class NbPlus extends Component {
  render() {
    let bool = this.props.val > 0;
    return (
      <div className={`plusplus ${bool ? "positif" : "negatif"}`}>
        {`${bool ? "+" : ""}${this.props.val}`}
      </div>
    );
  }
}
