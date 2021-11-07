import { Component } from "react";
import UIOptions from "./UIOptions";
import UIButtonOptions from "./UIButtonOptions";
import UIButtonPlay from "./UIButtonPlay";
import UIMenuJoueur from "./UIMenuJoueur";
// import Partie from "./Component/Partie";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenMenuRobot1: true,
      hiddenMenuRobot2: true,
      opt: false,
    };
    this.activeRobot = this.activeRobot.bind(this);
    this.activeOption = this.activeOption.bind(this);
  }

  activeRobot(robotId) {
    if (robotId === 1)
      this.setState({ hiddenMenuRobot1: !this.state.hiddenMenuRobot1 });
    else this.setState({ hiddenMenuRobot2: !this.state.hiddenMenuRobot2 });
  }

  activeOption() {
    this.setState({ opt: !this.state.opt });
  }

  render() {
    return (
      <div className="container">
        {this.state.opt ? (
          <UIOptions
            activeOption={this.activeOption}
            setOptions={this.props.setOptions}
          />
        ) : (
          <>
            <UIButtonOptions activeOption={this.activeOption} />
            <div className="menu">
              <UIMenuJoueur
                idJoueur={1}
                setNameJoueur={this.props.setNameJoueur}
                setTypeRobot={this.props.setTypeRobot}
              />
              <UIMenuJoueur
                idJoueur={2}
                setNameJoueur={this.props.setNameJoueur}
                setTypeRobot={this.props.setTypeRobot}
              />
              <UIButtonPlay setPlay={this.props.setPlay} />
            </div>
          </>
        )}
      </div>
    );
  }
}
