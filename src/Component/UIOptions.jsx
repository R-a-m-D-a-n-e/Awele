import { Component } from "react";
import ButtonOptions from "./ButtonOptions";
import ParamOpt from "./ParamOpt";
import Options from "../Object/Options";
import CheckboxSudNord from "./CheckboxSudNord";

export default class UIOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: new Options(),
    };
    this.setSize = this.setSize.bind(this);
    this.setPlateauJ1 = this.setPlateauJ1.bind(this);
    this.setButinJ1 = this.setButinJ1.bind(this);
    this.setPlateauJ2 = this.setPlateauJ2.bind(this);
    this.setButinJ2 = this.setButinJ2.bind(this);
    this.setTrait = this.setTrait.bind(this);
    this.setProfMiniMax = this.setProfMiniMax.bind(this);
    this.setProfAlphaBeta = this.setProfAlphaBeta.bind(this);
    this.setApply = this.setApply.bind(this);
    this.defaultOpt = this.defaultOpt.bind(this);
    this.ClearOpt = this.ClearOpt.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  setSize(newsize) {
    this.setState({ options: this.state.options.setSize(newsize) });
  }
  setPlateauJ1(newplateauJ1) {
    this.setState({
      options: this.state.options.setPlateauJ1(newplateauJ1),
    });
  }
  setButinJ1(newbutinJ1) {
    this.setState({ options: this.state.options.setButinJ1(newbutinJ1) });
  }
  setPlateauJ2(newplateauJ2) {
    this.setState({
      options: this.state.options.setPlateauJ2(newplateauJ2),
    });
  }
  setButinJ2(newbutinJ2) {
    this.setState({ options: this.state.options.setButinJ2(newbutinJ2) });
  }
  setTrait(newtrait) {
    this.setState({ options: this.state.options.setTrait(newtrait) });
  }
  setProfMiniMax(newprofMiniMax) {
    this.setState({
      options: this.state.options.setProfMiniMax(newprofMiniMax),
    });
  }
  setProfAlphaBeta(newprofAlphaBeta) {
    this.setState({
      options: this.state.options.setProfAlphaBeta(newprofAlphaBeta),
    });
  }
  changeOpt(newOpt) {
    let tmp = newOpt.clone();
    if (tmp.plateauJ1) tmp.plateauJ1 = `[${tmp.plateauJ1}]`;
    if (tmp.plateauJ2) tmp.plateauJ2 = `[${tmp.plateauJ2}]`;
    this.setState({ options: tmp });
    this.props.setOptions(newOpt);
  }
  setApply() {
    let compile = this.state.options.compileSytaxe();
    // console.log(compile);
    if (compile.state === "ok") {
      compile = compile.message.compileSemantique();
      // console.log(compile);
      if (compile.state === "ok") {
        this.changeOpt(compile.message);
      }
    } else console.log(compile);
  }

  defaultOpt() {
    this.changeOpt(Options.defaultOptions);
  }

  ClearOpt() {
    this.changeOpt(new Options());
  }

  handleKeyPress(event) {
    if (event.key === "Enter") this.setApply();
  }

  render() {
    return (
      <div className="options" onKeyPress={this.handleKeyPress}>
        <ButtonOptions
          className="buttonCancel"
          name=""
          action={this.props.activeOption}
        />
        <ParamOpt
          value={this.state.options.size}
          label="Size"
          info="3-10"
          pattern="^[0-9]*$"
          placeholder="6"
          setValue={this.setSize}
        />
        <ParamOpt
          value={this.state.options.plateauJ1}
          label="Plateau J1"
          info="[3,0,1,...]"
          pattern="^[0-9\[\],\s]*$"
          placeholder="[4, 4, 4, 4, 4, 4]"
          setValue={this.setPlateauJ1}
        />
        <ParamOpt
          value={this.state.options.butinJ1}
          label="Butin J1"
          info="0-99"
          pattern="^[0-9]*$"
          placeholder="0"
          setValue={this.setButinJ1}
        />
        <ParamOpt
          value={this.state.options.plateauJ2}
          label="Plateau J2"
          info="[3,0,1,...]"
          pattern="^[0-9\[\],\s]*$"
          placeholder="[4, 4, 4, 4, 4, 4]"
          setValue={this.setPlateauJ2}
        />
        <ParamOpt
          value={this.state.options.butinJ2}
          label="Butin J2"
          info="0-99"
          pattern="^[0-9]*$"
          placeholder="0"
          setValue={this.setButinJ2}
        />
        <CheckboxSudNord setValue={this.setTrait} />
        <ParamOpt
          value={this.state.options.profMiniMax}
          label="Prof MinMax"
          info="1-7"
          pattern="^[0-9]*$"
          placeholder="3"
          setValue={this.setProfMiniMax}
        />
        <ParamOpt
          value={this.state.options.profAlphaBeta}
          label="Prof AlphaBeta"
          info="1-7"
          pattern="^[0-9]*$"
          placeholder="3"
          setValue={this.setProfAlphaBeta}
        />
        <div className="bnt__options">
          <ButtonOptions
            className="buttonOpt"
            name="Clear"
            action={this.ClearOpt}
          />
          <ButtonOptions
            className="buttonOpt"
            name="Apply"
            action={this.setApply}
          />
          <ButtonOptions
            className="buttonOpt"
            name="Default"
            action={this.defaultOpt}
          />
        </div>
      </div>
    );
  }
}
