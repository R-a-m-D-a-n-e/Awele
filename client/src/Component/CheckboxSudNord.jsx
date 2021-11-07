import { Component } from "react";

export default class CheckboxSudNord extends Component {
  constructor(props) {
    super(props);
    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange(event) {
    // console.log(event.target.value);
    this.props.setValue(event.target.value);
  }

  render() {
    return (
      <div className="paramOpt">
        <span className="label__paramOpt">Trait</span>
        <label className="label__paramOpt label___CheckboxSudNord" htmlFor="r1">
          <input
            className="regular-radio "
            id="r1"
            type="radio"
            name="radio"
            value="SUD"
            defaultChecked
            onChange={this.handlerChange}
          />
          SUD
        </label>
        <label className="label__paramOpt label___CheckboxSudNord" htmlFor="r2">
          <input
            className="regular-radio "
            id="r2"
            type="radio"
            name="radio"
            value="NORD"
            onChange={this.handlerChange}
          />
          NORD
        </label>
        <span className="info__paramOpt">SUD|NORD</span>
      </div>
    );
  }
}
