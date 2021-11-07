import { Component } from "react";
import Input from "./Input";
import UIMenuRobot from "./UIMenuRobot";
import ActiveRobot from "./ActiveRobot";

export default class UIMenuJoueur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenMenuRobot: true,
      selectedOption: null,
    };
    this.activeRobot = this.activeRobot.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
  }

  activeRobot() {
    let opt = this.state.selectedOption;
    if (this.state.hiddenMenuRobot && opt)
      this.props.setTypeRobot(this.props.idJoueur, opt.value);
    else this.props.setTypeRobot(this.props.idJoueur, null);
    this.setState({ hiddenMenuRobot: !this.state.hiddenMenuRobot });
  }

  setSelectedOption(selectedOption) {
    this.props.setTypeRobot(this.props.idJoueur, selectedOption.value);
    this.setState({ selectedOption });
  }

  render() {
    return (
      <div className="box1">
        <div className="box11">
          <ActiveRobot
            activeRobot={this.activeRobot}
            hiddenMenuRobot={this.state.hiddenMenuRobot}
          />

          <Input
            setNameJoueur={this.props.setNameJoueur}
            idJoueur={this.props.idJoueur}
          />
        </div>
        <UIMenuRobot
          hiddenMenuRobot={this.state.hiddenMenuRobot}
          setSelectedOption={this.setSelectedOption}
        />
      </div>
    );
  }
}
