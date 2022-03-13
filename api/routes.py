from flask import Blueprint, jsonify, request
from . import db 
from .datatypes import Score
from .datatypes import Direction

#from datetime import datetime

main = Blueprint('main', __name__)


"""To add data into database via a http post request"""
@main.route('/add_score', methods=['POST'])
def add_score():
    score_data = request.get_json()
    
    new_score = Score(scorerName=score_data['scorerName'], 
                scorerLength=score_data['scorerLength'])

    db.session.add(new_score)
    db.session.commit()

    return 'Done', 201

'''
@main.route('/add_score', methods=["POST", "OPTIONS"])
def add_score():
    if request.method == "OPTIONS": # CORS preflight
        #response.headers.add("HTTP/1.1 200 OK")
        return _build_cors_preflight_response()
    elif request.method == "POST": # The actual request following the preflight

        score_data = request.get_json()
        
        new_score = Score(scorerName=score_data['scorerName'], 
                    scorerLength=score_data['scorerLength'])

        db.session.add(new_score)
        db.session.commit()

        #response.headers.add("HTTP/1.1 200 OK")
        return 'Done', 201
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
'''
'''
@main.route('/add_direction', methods=['POST'])
def add_direction():

    Direction.query.delete()
    db.session.commit()

    direction_data = request.get_json()

    new_direction = Direction(stickDirection=direction_data['stickDirection'])

    db.session.add(new_direction)

    db.session.commit()

    return 'Done', 201
'''

@main.route('/add_direction', methods=['POST'])
def add_direction():

    Direction.query.delete()
    db.session.commit()

    direction_data = request.get_json()

    new_direction = Direction(stickDirection=direction_data['stickDirection'],
                        buttonPressed=direction_data['buttonPressed'])

    db.session.add(new_direction)

    db.session.commit()

    return 'Done', 201

"""To query data from database by initiating a list, ingesting data into the list, and reading the list"""
@main.route('/scores')
def scores():
    score_list = Score.query.all()
    scores = []

    for score in score_list:
        scores.append({'scorerName' : score.scorerName, 'scorerLength' : score.scorerLength})

    return jsonify({'scores' : scores[::-1]})

@main.route('/directions')
def directions():
    direction_list = Direction.query.all()
    directions = []

    for direction in direction_list:
        
        direction_list.pop()

        directions.append({'stickDirection' : direction.stickDirection, 'buttonPressed': direction.buttonPressed})

    return jsonify({'directions' : directions[::-1]})

'''
@main.route('/directions')
def directions():
    direction_list = Direction.query.all()
    directions = []

    for direction in direction_list:
        
        direction_list.pop()

        directions.append({'stickDirection' : direction.stickDirection})

    return jsonify({'directions' : directions[::-1]})
'''

'''
return jsonify({'vitals' : vitals})
'''