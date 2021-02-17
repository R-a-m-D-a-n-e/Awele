import React, { Component } from "react";
import UICase from "./UICase";

export default class UIPlateau extends Component {
  render() {
    let j1 = [];
    let j2 = [];
    let dim = this.props.dim;
    // console.log(this.props);
    for (let i = 0; i < dim; i++) {
      j1.push(
        <UICase
          setFinPartie={this.props.setFinPartie}
          select={this.props.select}
          robot={this.props.robot1}
          trait={this.props.trait}
          joueur={"SUD"}
          key={i}
          getPosition={this.props.getPosition}
          setPosition={this.props.setPosition}
          nb={this.props.plateau[i]}
          id={i + 1}
        />
      );
      j2.push(
        <UICase
          setFinPartie={this.props.setFinPartie}
          select={this.props.select}
          robot={this.props.robot2}
          trait={this.props.trait}
          joueur={"NORD"}
          key={i + dim}
          getPosition={this.props.getPosition}
          setPosition={this.props.setPosition}
          nb={this.props.plateau[2 * dim - i - 1]}
          id={i + 1}
        />
      );
    }
    return (
      <div className="plateau">
        <div className="joueur">{j2}</div>
        <div className="joueur">{j1}</div>
      </div>
    );
  }
}
