import React, { Component } from "react";
import Butin from "./Butin.jsx";
import UIPlateau from "./UIPlateau";
import Robot from "../Object/Robot";
import MenuPartie from "./MenuPartie.jsx";
import ButtonMenuPartie from "./ButtonMenuPartie.jsx";

export default class Partie extends Component {
  constructor(props) {
    super(props);
    let df = props.options;
    let dim = df.size;
    let prof1 = null,
      prof2 = null;
    if (props.typeRobot1 === "AlphaBeta") prof1 = df.profAlphaBeta;
    if (props.typeRobot1 === "MiniMax") prof1 = df.profMiniMax;
    if (props.typeRobot2 === "AlphaBeta") prof2 = df.profAlphaBeta;
    if (props.typeRobot2 === "MiniMax") prof2 = df.profMiniMax;

    this.robot1 = props.typeRobot1
      ? new Robot("SUD", props.typeRobot1, prof1)
      : null;
    this.robot2 = props.typeRobot2
      ? new Robot("NORD", props.typeRobot2, prof2)
      : null;
    this.select = null;
    this.state = {
      position: {
        plateau: [...df.plateauJ1, ...df.plateauJ2],
        trait: df.trait,
        dimension: dim,
        butin: { SUD: df.butinJ1, NORD: df.butinJ2 },
        select: null,
      },
      menuPartie: false,
      finPartie: { name: "", end: false },
    };
    this.defaultPosition = { ...this.state.position };
    this.getPosition = this.getPosition.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setMenuPartie = this.setMenuPartie.bind(this);
    this.replay = this.replay.bind(this);
    this.setFinPartie = this.setFinPartie.bind(this);
  }

  getPosition() {
    return this.state.position;
  }

  setMenuPartie() {
    this.setState({ menuPartie: !this.state.menuPartie });
  }

  setFinPartie(joueur, end) {
    let name;
    if (joueur === "SUD") name = this.props.nameJoueur1;
    else if (joueur === "NORD") name = this.props.nameJoueur2;
    this.setState({ finPartie: { name, end } });
    if (end) this.setMenuPartie();
  }

  setPosition(newPosition) {
    // console.log("setPosition");
    this.setState({ position: newPosition });
    setTimeout(() => {
      if (this.robot1 && this.robot1.getRole() === newPosition.trait) {
        // console.log("robot1");
        this.robot1.play(newPosition, this.setPosition);
      }
      if (this.robot2 && this.robot2.getRole() === newPosition.trait) {
        // console.log("robot2");
        this.robot2.play(newPosition, this.setPosition);
      }
    }, 1000);
  }

  replay() {
    this.setPosition(this.defaultPosition);
    this.setFinPartie("", false);
  }

  componentDidMount() {
    this.setPosition({ ...this.state.position });
  }

  render() {
    return (
      <div>
        <div className="partie">
          <Butin
            val={this.state.position.butin.NORD}
            name={this.props.nameJoueur2}
            idJoueur={2}
            trait={this.state.position.trait === "NORD"}
          />
          <UIPlateau
            plateau={this.state.position.plateau}
            select={this.state.position.select}
            dim={this.state.position.dimension}
            trait={this.state.position.trait}
            robot1={this.robot1}
            robot2={this.robot2}
            getPosition={this.getPosition}
            setPosition={this.setPosition}
            setFinPartie={this.setFinPartie}
          />
          <Butin
            val={this.state.position.butin.SUD}
            name={this.props.nameJoueur1}
            idJoueur={1}
            trait={this.state.position.trait === "SUD"}
          />
        </div>
        {this.state.menuPartie ? (
          <MenuPartie
            setMenuPartie={this.setMenuPartie}
            setPlay={this.props.setPlay}
            replay={this.replay}
            doubleRobot={this.robot1 && this.robot2}
            fin={this.state.finPartie}
          />
        ) : (
          <ButtonMenuPartie setMenuPartie={this.setMenuPartie} />
        )}
      </div>
    );
  }
}
