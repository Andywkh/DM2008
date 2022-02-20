from . import db 

'''Setting up your typing for your ingested data'''

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    scorerName = db.Column(db.String(25))
    scorerLength = db.Column(db.Integer)

class Direction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stickDirection = db.Column(db.Integer)