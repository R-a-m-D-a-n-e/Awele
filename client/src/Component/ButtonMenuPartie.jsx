import { Component } from "react";

export default class ButtonMenuPartie extends Component {
  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick() {
    this.props.setMenuPartie();
  }

  render() {
    return <div className="buttonMenuPartie" onClick={this.handlerClick}></div>;
  }
}
