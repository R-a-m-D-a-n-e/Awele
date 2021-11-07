import { Component } from "react";
import Select from "react-select";
import "@fortawesome/fontawesome-free/css/all.css";

const options = [
  { value: "Aleatoire", label: "Aleatoire" },
  { value: "MiniMax", label: "MiniMax" },
  { value: "AlphaBeta", label: "AlphaBeta" },
];

export default class UIMenuRobot extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOption) {
    this.props.setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    return (
      <div
        className={`menuRobot ${
          this.props.hiddenMenuRobot ? "hiddenMenuRobot" : ""
        }`}
      >
        <Select
          // isDisabled={true}
          // value={this.state.selectedOption}
          isSearchable={false}
          classNamePrefix="optRobot"
          className="option"
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}
