import { Component } from "react";
import Menu from "./Component/Menu";
import "./Style/style2.css";
import Partie from "./Component/Partie";
import Options from "./Object/Options";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.nameJoueur1 = "Ramdane";
    this.nameJoueur2 = "Salhi";
    this.typeRobot1 = null;
    this.typeRobot2 = null;
    this.state = {
      play: false,
      options: Options.defaultOptions,
    };
    this.setPlay = this.setPlay.bind(this);
    this.setOptions = this.setOptions.bind(this);
    this.setNameJoueur = this.setNameJoueur.bind(this);
    this.setTypeRobot = this.setTypeRobot.bind(this);
  }

  setPlay(val) {
    this.setState({ play: val });
    if (!val) {
      this.nameJoueur1 = "Ramdane";
      this.nameJoueur2 = "Salhi";
      this.typeRobot1 = null;
      this.typeRobot2 = null;
    }
  }

  setOptions(val) {
    this.setState({ options: val });
  }

  setNameJoueur(idJoueur, name) {
    if (idJoueur === 1) this.nameJoueur1 = name;
    else this.nameJoueur2 = name;
  }

  setTypeRobot(idJoueur, type) {
    if (idJoueur === 1) this.typeRobot1 = type;
    else this.typeRobot2 = type;
  }
  render() {
    // console.log(this.typeRobot1, this.typeRobot2);
    let opt = this.state.options.isEmpty()
      ? Options.defaultOptions
      : this.state.options;
    return (
      <div className="App">
        {!this.state.play ? (
          <Menu
            setPlay={this.setPlay}
            setOptions={this.setOptions}
            setNameJoueur={this.setNameJoueur}
            setTypeRobot={this.setTypeRobot}
          />
        ) : (
          ""
        )}
        {this.state.play ? (
          <Partie
            setPlay={this.setPlay}
            robotRole={"NORD"}
            nameJoueur1={this.nameJoueur1}
            nameJoueur2={this.nameJoueur2}
            typeRobot1={this.typeRobot1}
            typeRobot2={this.typeRobot2}
            options={opt}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
