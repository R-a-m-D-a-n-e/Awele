import { Component } from "react";

export default class UIButtonPlay extends Component {
  constructor(props) {
    super(props);

    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick() {
    this.props.setPlay(true);
  }
  render() {
    return (
      <div className="buttons" onClick={this.handlerClick}>
        <div className="btn effect01" target="_blank">
          <span>Play</span>
        </div>
      </div>
    );
  }
}
