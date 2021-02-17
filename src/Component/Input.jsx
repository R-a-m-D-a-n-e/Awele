import { Component } from "react";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let value = event.target.value;
    if (value.length < 11) {
      this.props.setNameJoueur(this.props.idJoueur, value);
      this.setState({ value });
    }
  }
  render() {
    return (
      <div className="centered">
        <label htmlFor={this.props.placeholder} className="inp">
          <input
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
            type="text"
            id={this.props.placeholder}
            placeholder={`Joueur ${this.props.idJoueur}`}
            pattern=".{2,}"
            required
          />
          <svg
            width="100%"
            height="18px"
            viewBox="0 0 280 18"
            className="border"
          >
            <path d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12"></path>
          </svg>
          <svg width="14px" height="12px" viewBox="0 0 14 12" className="check">
            <path d="M1 7 5.5 11 L13 1"></path>
          </svg>
        </label>
      </div>
    );
  }
}
