import Message from "./Message";

export default class Options {
  static defaultOptions = new Options(
    6, [4, 4, 4, 4, 4, 4],
    0, [4, 4, 4, 4, 4, 4],
    0,
    "SUD",
    3,
    3
  );
  static constraintsOption = {
    size: { valMin: 3, valMax: 10 },
    plateau: /^\[(?:\s*[0-9]+\s*,)*\s*[0-9]+\s*\]$/,
    butin: { valMin: 0, valMax: 99 },
    profMiniMax: { valMin: 1, valMax: 7 },
    profAlphaBeta: { valMin: 1, valMax: 7 },
  };
  constructor(
    size = "",
    plateauJ1 = "",
    butinJ1 = "",
    plateauJ2 = "",
    butinJ2 = "",
    trait = "SUD",
    profMiniMax = "",
    profAlphaBeta = ""
  ) {
    this.size = size;
    this.plateauJ1 = plateauJ1;
    this.butinJ1 = butinJ1;
    this.plateauJ2 = plateauJ2;
    this.butinJ2 = butinJ2;
    this.trait = trait;
    this.profMiniMax = profMiniMax;
    this.profAlphaBeta = profAlphaBeta;
  }

  isEmpty() {
    return (
      this.size === "" &&
      this.plateauJ1 === "" &&
      this.butinJ1 === "" &&
      this.plateauJ2 === "" &&
      this.butinJ2 === "" &&
      this.trait === "SUD" &&
      this.profMiniMax === "" &&
      this.profAlphaBeta === ""
    );
  }

  clone() {
    return new Options(
      this.size,
      this.plateauJ1,
      this.butinJ1,
      this.plateauJ2,
      this.butinJ2,
      this.trait,
      this.profMiniMax,
      this.profAlphaBeta
    );
  }

  setSize(newsize) {
    let res = this.clone();
    res.size = newsize;
    return res;
  }
  setPlateauJ1(newplateauJ1) {
    let res = this.clone();
    res.plateauJ1 = newplateauJ1;
    return res;
  }
  setButinJ1(newbutinJ1) {
    let res = this.clone();
    res.butinJ1 = newbutinJ1;
    return res;
  }
  setPlateauJ2(newplateauJ2) {
    let res = this.clone();
    res.plateauJ2 = newplateauJ2;
    return res;
  }
  setButinJ2(newbutinJ2) {
    let res = this.clone();
    res.butinJ2 = newbutinJ2;
    return res;
  }
  setTrait(newtrait) {
    let res = this.clone();
    res.trait = newtrait;
    return res;
  }
  setProfMiniMax(newprofMiniMax) {
    let res = this.clone();
    res.profMiniMax = newprofMiniMax;
    return res;
  }
  setProfAlphaBeta(newprofAlphaBeta) {
    let res = this.clone();
    res.profAlphaBeta = newprofAlphaBeta;
    return res;
  }

  toArray(plateau) {
    let cnt = Options.constraintsOption;
    let c = plateau.match(cnt.plateau);
    let res = [];
    if (c) {
      let tmp = c[0];
      tmp = tmp.replaceAll(/\s+|\[|\]/g, "");
      tmp = tmp.split(",");
      tmp.forEach((e) => {
        res.push(e * 1);
      });
    }
    return res;
  }

  sheckPlateau(plateau) {
    let c = this.toArray(plateau);
    if (c.length > 0) return c;
    return new Message(
      "ko",
      `la valeur de Plateau doit être sous cette forme [5,9,6,3,7,7,...]`
    );
  }
  sheckButin(butin) {
    let cnt = Options.constraintsOption;
    if (butin > cnt.butin.valMax || butin < cnt.butin.valMin)
      return new Message(
        "ko",
        `la valeur de butin doit être compris entre ${cnt.butin.valMin} et ${cnt.butin.valMax}`
      );
    return 1;
  }

  compileSytaxe() {
    let tmp = "";
    let res = this.clone();
    if (this.plateauJ1 !== "" && !Array.isArray(this.plateauJ1)) {
      tmp = this.sheckPlateau(this.plateauJ1);
      if (!Array.isArray(tmp)) return tmp;
    }
    res.plateauJ1 = tmp;
    tmp = "";
    if (this.plateauJ2 !== "" && !Array.isArray(this.plateauJ2)) {
      tmp = this.sheckPlateau(this.plateauJ2);
      if (!Array.isArray(tmp)) return tmp;
    }
    res.plateauJ2 = tmp;
    return new Message("ok", res);
  }
  compileSemantique() {
    let res = new Options();
    let df = Options.defaultOptions;
    let cnt = Options.constraintsOption;
    let sum = 0;
    let tmp = 0;
    let val;
    let booltmp = false;
    let boolSize = this.size === "";
    let boolPlateauJ1 = this.plateauJ1 === "";
    let boolPlateauJ2 = this.plateauJ2 === "";
    let boolButinJ1 = this.butinJ1 === "";
    let boolButinJ2 = this.butinJ2 === "";
    let boolProfMiniMax = this.profMiniMax === "";
    let boolProfAlphaBeta = this.profAlphaBeta === "";
    let boolTrait = this.trait === "";
    /////////////////////////// Size
    if (boolSize) {
      if (boolPlateauJ1) {
        if (boolPlateauJ2) {
          res.size = df.size;
        } else {
          res.size = this.plateauJ2.length;
        }
      } else {
        res.size = this.plateauJ1.length;
      }
    } else {
      res.size = parseInt(this.size);
    }
    if (res.size > cnt.size.valMax || res.size < cnt.size.valMin)
      return new Message(
        "ko",
        `la valeur de size doit être compris entre ${cnt.size.valMin} et ${cnt.size.valMax}`
      );
    /////////////////////////// Plateau
    if (boolPlateauJ1) {
      if (boolPlateauJ2) {
        res.plateauJ1 = Array.from({ length: res.size }, (_, __) => 4);
        res.plateauJ2 = Array.from({ length: res.size }, (_, __) => 4);
      } else {
        return new Message("ko", `le Plateau J1 est vide !!!`);
      }
    } else {
      if (boolPlateauJ2) {
        return new Message("ko", `le Plateau J2 est vide !!!`);
      } else {
        res.plateauJ1 = [...this.plateauJ1];
        res.plateauJ2 = [...this.plateauJ2];
        if (res.plateauJ1.length !== res.plateauJ2.length) {
          return new Message(
            "ko",
            `les deux plateaux doit avoire la même taille`
          );
        }
        if (
          res.plateauJ1.length !== res.size ||
          res.plateauJ2.length !== res.size
        ) {
          return new Message(
            "ko",
            `le plateau doit avoire la taille entre dans size`
          );
        }
      }
    }
    val = res.size * 8;
    sum = 0;
    res.plateauJ1.forEach((e) => {
      sum += e;
    });
    res.plateauJ2.forEach((e) => {
      sum += e;
    });
    /////////////////////////// Butin
    tmp = val - sum;
    if (boolButinJ1) {
      if (boolButinJ2) {
        tmp = Math.trunc(tmp / 2);
        booltmp = true;
        res.butinJ1 = tmp;
        res.butinJ2 = tmp;
      } else {
        res.butinJ2 = parseInt(this.butinJ2);
        res.butinJ1 = tmp - res.butinJ2;
      }
    } else {
      res.butinJ1 = parseInt(this.butinJ1);
      if (boolButinJ2) {
        res.butinJ2 = tmp - res.butinJ1;
      } else {
        res.butinJ2 = parseInt(this.butinJ2);
      }
    }
    if (boolButinJ2) {
      res.butinJ2 = tmp;
    } else {
      res.butinJ2 = parseInt(this.butinJ2);
    }
    tmp = this.sheckButin(res.butinJ1);
    if (tmp !== 1) return tmp;
    tmp = this.sheckButin(res.butinJ2);
    if (tmp !== 1) return tmp;

    sum += res.butinJ1 + res.butinJ2;
    // console.log(sum, val);
    if ((!booltmp && sum !== val) || (sum > val && booltmp))
      return new Message(
        "ko",
        `la somme des points doit être égale à (8 * Size) ${val}`
      );
    /////////////////////////// ProfMiniMax
    if (boolProfMiniMax) {
      res.profMiniMax = df.profMiniMax;
    } else {
      res.profMiniMax = parseInt(this.profMiniMax);
    }
    if (
      res.profMiniMax > cnt.profMiniMax.valMax ||
      res.profMiniMax < cnt.profMiniMax.valMin
    )
      return new Message(
        "ko",
        `la valeur de profMiniMax doit être compris entre ${cnt.profMiniMax.valMin} et ${cnt.profMiniMax.valMax}`
      );
    /////////////////////////// ProfAlphaBeta
    if (boolProfAlphaBeta) {
      res.profAlphaBeta = df.profAlphaBeta;
    } else {
      res.profAlphaBeta = parseInt(this.profAlphaBeta);
    }
    if (
      res.profAlphaBeta > cnt.profAlphaBeta.valMax ||
      res.profAlphaBeta < cnt.profAlphaBeta.valMin
    )
      return new Message(
        "ko",
        `la valeur de profAlphaBeta doit être compris entre ${cnt.profAlphaBeta.valMin} et ${cnt.profAlphaBeta.valMax}`
      );

    /////////////////////////// Trait
    res.trait = this.trait;
    if (boolTrait) {
      res.trait = df.trait;
    }
    return new Message("ok", res);
  }
}