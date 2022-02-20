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

@main.route('/add_direction', methods=['POST'])
def add_direction():

    Direction.query.delete()
    db.session.commit()

    direction_data = request.get_json()
    
    new_direction = Direction(stickDirection=direction_data['stickDirection'])

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

        directions.append({'stickDirection' : direction.stickDirection})

    return jsonify({'directions' : directions[::-1]})

'''
return jsonify({'vitals' : vitals})
'''