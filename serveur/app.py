from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import play as py
import robot as rb


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/joue_un_coup", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def joue_un_coup():
    # try:
    position, coup = py.getData(request.json)
    print(position, coup)
    res, _ = py.play(position, coup)
    return res
    # # except:
    # #     return jsonify({'state': 'ko'})


@app.route("/robotAleatoire", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def robotAleatoire():
    i = 0
    state = False
    # try:
    position, _ = py.getData(request.json)
    while i < 100 and not state:
        coup = rb.genere_un_coup(position)
        print(coup)
        res, state = py.play(position, coup)
        i += 1
    return res
    # # except:
    # #     return jsonify({'state': 'ko'})


@app.route("/robotMiniMax", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def robotMinimax():
    # try:
    position, prof = py.getData(request.json)
    print(position, prof)
    coup, val = rb.minimax(position, prof)
    res, _ = py.play(position, coup)
    return res
    # # except:
    # #     return jsonify({'state': 'ko'})


@app.route("/robotAlphaBeta", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def robotAlphaBeta():
    # try:
    position, prof = py.getData(request.json)
    print(position, prof)
    coup, val = rb.alphabeta(position, prof, -99, +99)
    res, _ = py.play(position, coup)
    return res
    # # except:
    # #     return jsonify({'state': 'ko'})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
