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
        pass

class FlowerResource(Resource):
    
    def get(self):
        pass

    def post(self):
        pass

class RibbonResource(Resource):

    def get(self):
        pass

    def post(self):
        pass

class AccentResource(Resource):

    def get(self):
        pass

    def post(self):
        pass

api.add_resource(Home, '/api')
api.add_resource(WristletResource, '/api/wristlets')
api.add_resource(FlowerResource, '/api/flowers')
api.add_resource(RibbonResource, '/api/ribbons')
api.add_resource(AccentResource, '/api/accents')


if __name__ == '__main__':
    app.run(port=5555, debug=True)