import { Component } from "react";

export default class MenuPartie extends Component {
  constructor(props) {
    super(props);
    this.handlerPlay = this.handlerPlay.bind(this);
    this.handlerReplay = this.handlerReplay.bind(this);
    this.handlerExit = this.handlerExit.bind(this);
  }

  handlerPlay() {
    this.props.setMenuPartie();
  }

  handlerReplay() {
    if (!this.props.doubleRobot) {
      this.props.setMenuPartie();
      this.props.replay();
    }
  }

  handlerExit() {
    this.props.setPlay(false);
  }

  render() {
    return (
      <div className="menuPartie">
        {this.props.fin.end ? (
          <div className="finPartie"> {this.props.fin.name} a gagné </div>
        ) : (
          ""
        )}

        <div className="boxMenuPartie">
          <div className="btn__menuPartie play" onClick={this.handlerPlay}>
            Play
          </div>
          <div
            className={`btn__menuPartie ${
              this.props.doubleRobot ? "disableReplay" : ""
            }`}
            onClick={this.handlerReplay}
          >
            Replay
          </div>
          <div className="btn__menuPartie exit" onClick={this.handlerExit}>
            Exit
          </div>
        </div>
      </div>
    );
  }
}
