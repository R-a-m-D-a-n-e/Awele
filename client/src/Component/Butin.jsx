import React, { Component } from "react";

export default class Butin extends Component {
  render() {
    // return <div className="butin">{this.props.val}</div>;
    return (
      <div className={`butin butinJoueur${this.props.idJoueur} `}>
        {this.props.trait ? <span className="trait" /> : ""}
        <div className="val">{this.props.val}</div>
        <div className={`nameJoueur${this.props.idJoueur}`}>
          {this.props.name}
        </div>
      </div>
    );
  }
}
