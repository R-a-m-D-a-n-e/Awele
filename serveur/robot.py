import numpy as np
import awele as aw


def genere_un_coup(position):
    n = position['dimension']
    if(position['trait'] == "SUD"):
        case = position['plateau'][:n]
        caseValide = np.arange(1, n+1)[np.where(case > 0, True, False)]
    else:
        case = position['plateau'][n:]
        caseValide = np.arange(n, 0, -1)[np.where(case > 0, True, False)]

    l = len(caseValide)
    if(l == 0):
        return 0
    return caseValide[np.random.randint(l)]


def evalue(position):
    n = position['dimension']
    plateau = position['plateau']
    a = 2 * position['butin']["SUD"] + np.array(
        [1 if(plateau[i] == 1 or plateau[i] == 2) else 0 for i in range(n, 2*n)]).sum()
    b = 2 * position['butin']["NORD"] + np.array(
        [1 if(plateau[i] == 1 or plateau[i] == 2) else 0 for i in range(n)]).sum()

    if(position['trait'] == "SUD"):
        return a - b
    return b - a


def minimax(position, prof):
    if(prof == 0 or aw.est_terminale(position)):
        return (0, evalue(position))
    trait = position['trait']
    n = position['dimension']
    if(trait == 'SUD'):
        def f(x, y): return x < y
        valOpt = -99
    else:
        def f(x, y): return x > y
        valOpt = 99
    coupOpt = 0
    for coup in range(1, n+1):
        newPosition = aw.effectue_si_valide(position, coup)
        if(newPosition):
            _, newVal = minimax(newPosition, prof-1)
            if(f(valOpt, newVal)):
                valOpt = newVal
                coupOpt = coup
    return (coupOpt, valOpt)


def alphabeta(position, prof, alpha, beta):
    if(prof == 0 or aw.est_terminale(position)):
        return (0, evalue(position))
    trait = position['trait']
    n = position['dimension']
    coupOpt = 0
    coup = 1
    if(trait == 'SUD'):
        while coup < n+1 and alpha < beta:
            newPosition = aw.effectue_si_valide(position, coup)
            if(newPosition):
                _, newVal = alphabeta(newPosition, prof-1, alpha, beta)
                if(newVal > alpha):
                    alpha = newVal
                    coupOpt = coup
            coup += 1
        return coupOpt, alpha
    else:
        while coup < n+1 and alpha < beta:
            newPosition = aw.effectue_si_valide(position, coup)
            if(newPosition):
                _, newVal = alphabeta(newPosition, prof-1, alpha, beta)
                if(newVal < beta):
                    beta = newVal
                    coupOpt = coup
            coup += 1
        return coupOpt, beta
