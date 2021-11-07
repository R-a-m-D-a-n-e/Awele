import axios from "axios";

// robotAleatoire  robotMiniMax robotAlphaBeta
export default class Robot {
  constructor(role, type = null, prof = null) {
    this.role = role;
    this.type = type;
    this.prof = prof;
  }

  getRole() {
    return this.role;
  }
  getType() {
    return this.type;
  }

  play(position, callback) {
    const json = JSON.stringify({
      position,
      prof: this.prof,
    });
    axios
      .post(`http://127.0.0.1:5000/robot${this.type}`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data.state === "ok") callback(res.data);
      });
  }
}