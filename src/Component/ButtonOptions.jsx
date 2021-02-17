import { Component } from "react";

export default class ButtonOptions extends Component {
  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick() {
    this.props.action();
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.handlerClick}>
        {this.props.name}
      </div>
    );
  }
}
