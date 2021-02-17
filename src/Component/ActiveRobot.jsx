import { Component } from "react";

export default class ActiveRobot extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.activeRobot();
  }
  render() {
    return (
      <div
        className={`activeRobot ${
          this.props.hiddenMenuRobot ? "notactiveRobot" : ""
        }`}
        onClick={this.handleChange}
      />
    );
  }
}
