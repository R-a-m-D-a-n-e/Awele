import { Component } from "react";

export default class ParamOpt extends Component {
  constructor(props) {
    super(props);
    // this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    let pattern = this.props.pattern;
    // console.log(value.match(pattern));

    if (value === "" || value.match(pattern)) {
      this.props.setValue(value);
      // this.setState({ value });
    }
  }

  render() {
    return (
      <div className="paramOpt">
        <label htmlFor={this.props.label} className="label__paramOpt">
          {this.props.label}
        </label>
        <input
          className="input__paramOpt"
          type="text"
          value={this.props.value}
          onChange={this.handleChange}
          autoComplete="off"
          id={this.props.label}
          placeholder={this.props.placeholder}
        />

        <span className="info__paramOpt">{this.props.info}</span>
      </div>
    );
  }
}
