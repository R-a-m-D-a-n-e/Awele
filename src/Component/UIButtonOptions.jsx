import { Component } from "react";

export default class UIButtonOptions extends Component {
  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick() {
    this.props.activeOption();
  }

  render() {
    return <div className="btn_options" onClick={this.handlerClick}></div>;
  }
}
