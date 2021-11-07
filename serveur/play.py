import numpy as np
import json
import awele as aw


def getData(requestJson):
    position = requestJson['position']
    position['plateau'] = np.array(position['plateau'])
    coup = requestJson.get('coup')
    if(not coup):
        prof = requestJson.get('prof')
        return position, prof

    return position, coup


def play(position, coup):
    newPosition = aw.effectue_si_valide(position, coup)
    print(newPosition)
    if(newPosition and aw.est_terminale(newPosition)):
        return json.loads(json.dumps({'state': 'end'})), True
    if(newPosition):
        newPosition['plateau'] = newPosition['plateau'].tolist()
        newPosition['state'] = 'ok'
        newPosition['select'] = int(coup)
        res = json.loads(json.dumps(newPosition))
        return res, True
    else:
        return json.loads(json.dumps({'state': 'ko'})), False
