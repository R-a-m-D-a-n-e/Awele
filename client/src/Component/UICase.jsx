import React, { Component } from "react";
import axios from "axios";
import NbPlus from "./NbPlus";

export default class UICase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shake: false,
    };
    this.joueur = this.props.joueur;
    this.id = this.props.id;
    this.val = this.props.nb;
    this.key = 0;
    this.listplus = [];
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick() {
    if (
      this.joueur !== this.props.trait ||
      (this.props.robot && this.props.robot.getRole() === this.props.trait)
    ) {
      this.setState({ shake: true });
      return;
    }
    const json = JSON.stringify({
      position: this.props.getPosition(),
      coup: this.id,
    });
    axios
      .post(`http://127.0.0.1:5000/joue_un_coup`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data.state === "ok") this.props.setPosition(res.data);
        else {
          if (res.data.state === "ko") this.setState({ shake: true });
          else {
            this.props.setFinPartie(this.joueur, true);
          }
        }
      });
  }

  componentDidUpdate() {
    if (this.state.shake) {
      setTimeout(() => {
        this.setState({ shake: false });
      }, 1000);
    }
  }

  hasSelect() {
    return this.joueur !== this.props.trait && this.props.select === this.id;
  }

  render() {
    // console.log(this.hasSelect());
    let select = this.hasSelect();
    if (this.props.nb !== this.val) {
      if (!select) {
        let tmp = this.props.nb - this.val;
        let k = this.listplus.length;
        this.key += 1;
        if (k === 2) this.listplus = [<NbPlus key={this.key} val={tmp} />];
        else
          this.listplus = [
            ...this.listplus,
            <NbPlus key={this.key} val={tmp} />,
          ];
        // console.log(this.id, this.listplus);
      }
      this.val = this.props.nb;
    }
    return (
      <div
        className={`case joueur_${this.joueur} ${
          this.state.shake ? "shake" : ""
        } ${select ? "select" : ""}`}
        onClick={this.handlerClick}
      >
        {this.props.nb}
        {this.listplus}
      </div>
    );
  }
}
