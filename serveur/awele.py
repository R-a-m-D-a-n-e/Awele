import copy
import numpy as np

# - - - - - - - - - - - - - - - String to Position


def string2position(strpos, delimiter):
    tmp = strpos.split(delimiter)
    position = np.array([int(s) for s in tmp])

    return position

# - - - - - - - - - - - - - - - renvoier la valeur de la case i


def getCase(position, i):
    trait = position['trait']
    n = position['dimension']
    if trait == 'SUD':
        return position['plateau'][i-1]
    return position['plateau'][2*n-i]

# - - - - - - - - - - - - - - - RECOPIE


def duplique(position):
    """ POSITION -> POSITION
        retourne une copie dupliquée de la position
        (qui peut être alors modifié sans altérer l'originale donc).
    """
    leclone = dict()
    leclone['plateau'] = copy.deepcopy(position['plateau'])
    leclone['dimension'] = position['dimension']
    leclone['trait'] = position['trait']
    leclone['butin'] = copy.deepcopy(position['butin'])
    return leclone

# - - - - - - - - - - - - - - - JOUE UN COUP


def joue_un_coup(position, coup):
    """ POSITION * COUP -> POSITION
        Hypothèse: coup est correct.

        Cette fonction retourne la position obtenue une fois le coup joué.
    """
    nouvelle_pos = duplique(
        position)   # on duplique pour ne pas modifier l'original
    n = nouvelle_pos['dimension']
    trait = nouvelle_pos['trait']
    # on transforme coup en indice
    if trait == 'SUD':
        indice_depart = coup-1
    else:
        indice_depart = 2*n-coup
    # retrait des graines de la case de départ
    nbGraines = nouvelle_pos['plateau'][indice_depart]
    nouvelle_pos['plateau'][indice_depart] = 0
    # on sème les graines dans les cases à partir de celle de départ
    indice_courant = indice_depart
    while nbGraines > 0:
        indice_courant = (indice_courant + 1) % (2*n)
        if (indice_courant != indice_depart):              # si ce n'est pas la case de départ
            nouvelle_pos['plateau'][indice_courant] += 1   # on sème une graine
            nbGraines -= 1
    # la case d'arrivée est dans le camp ennemi ?
    if (trait == 'NORD'):
        estChezEnnemi = (indice_courant < n)
    else:
        estChezEnnemi = (indice_courant >= n)
    # réalisation des prises éventuelles
    while estChezEnnemi and (nouvelle_pos['plateau'][indice_courant] in range(2, 4)):
        nouvelle_pos['butin'][trait] += int(
            nouvelle_pos['plateau'][indice_courant])
        nouvelle_pos['plateau'][indice_courant] = 0
        indice_courant = (indice_courant - 1) % (2*n)
        if (trait == 'NORD'):
            estChezEnnemi = (indice_courant < n)
        else:
            estChezEnnemi = (indice_courant >= n)
    # mise à jour du camp au trait
    if trait == 'SUD':
        nouvelle_pos['trait'] = 'NORD'
    else:
        nouvelle_pos['trait'] = 'SUD'
    return nouvelle_pos
# - - - - - - - - - -


def est_correct(position, i):
    n = position['dimension']
    if(i < 1 or i > n or getCase(position, i) < 1):
        return False
    return True


def est_legale(position):
    n = position['dimension']
    trait = position['trait']
    if(trait == "SUD"):
        return (position['plateau'][:n] > 0).any()
    return (position['plateau'][n:] > 0).any()


def effectue_si_valide(position, coup):
    if(not est_correct(position, coup)):
        return False
    newPosition = joue_un_coup(position, coup)
    if(not est_legale(newPosition)):
        return False
    return newPosition


def est_terminale(position):
    n = position['dimension']
    trait = position['trait']

    if(position['butin']["NORD"] >= n*4+1 or position['butin']["SUD"] >= n*4+1):
        return True

    for i in range(1, n+1):
        if(est_correct(position, i)):
            newPosition = joue_un_coup(position, i)
            if(est_legale(newPosition)):
                return False
    return True
