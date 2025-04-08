#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Wristlet, Flower, Ribbon, Accent

# Views go here!

class Home(Resource):

    def get(self):
        return {"message": "Welcome to the Ready Set Bloom RESTful API"}, 200

@app.route('/')
def index():
    return '<h1>Corsage/Bout Server</h1>'

class WristletResource(Resource):

    def get(self):
        wristlet_dicts = [wristlet.to_dict() for wristlet in Wristlet.query.all()]
        return wristlet_dicts , 200

    def post(self):
        json = request.get_json()
        try:
            new_wristlet = Wristlet(color=json['color'], style=json['style'])
            db.session.add(new_wristlet)
            db.session.commit()

            return new_wristlet.to_dict(), 201
        except:
            return {"errors":["validation errors"]} , 400


class FlowerResource(Resource):
    
    def get(self):
        flower_dicts = [flower.to_dict() for flower in Flower.query.all()]
        return flower_dicts , 200

    def post(self):
        json = request.get_json()
        try:
            new_flower = Flower(name=json['name'], color=json['color'])
            db.session.add(new_flower)
            db.session.commit()

            return new_flower.to_dict() , 201
        except:
            return {"errors":["validation errors"]} , 400

class RibbonResource(Resource):

    def get(self):
        ribbon_dicts = [ribbon.to_dict() for ribbon in Ribbon.query.all()]
        return ribbon_dicts , 200

    def post(self):
        json = request.get_json()
        try:
            new_ribbon = Ribbon(color=json['color'])
            db.session.add(new_ribbon)
            db.session.commit()

            return new_ribbon.to_dict() , 201
        except:
            return {"errors":["validation errors"]} , 400

class AccentResource(Resource):

    def get(self):
        accent_dicts = [accent.to_dict() for accent in Accent.query.all()]
        return accent_dicts , 200

    def post(self):
        json = request.get_json()
        try:
            new_accent = Accent(color=json['color'])
            db.session.add(new_accent)
            db.session.commit()

            return new_accent.to_dict() , 201
        except:
            return {"errors":["validation errors"]} , 400

api.add_resource(Home, '/api')
api.add_resource(WristletResource, '/api/wristlets')
api.add_resource(FlowerResource, '/api/flowers')
api.add_resource(RibbonResource, '/api/ribbons')
api.add_resource(AccentResource, '/api/accents')


if __name__ == '__main__':
    app.run(port=5555, debug=True)