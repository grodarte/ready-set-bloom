#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import Event, Order, Item, Wristlet, Flower, Accent

# Views go here!

class Home(Resource):

    def get(self):
        return {"message": "Welcome to the Ready Set Bloom RESTful API"}, 200

@app.route('/')
def index():
    return '<h1>Corsage/Bout Server</h1>'

class EventResource(Resource):

    def get(self):
        event_dicts = [event.to_dict() for event in Event.query.all()]
        return event_dicts, 200

    def post(self):
        try:
            json = request.get_json()
            event_date = datetime.strptime(json.get('event_date'), '%Y-%m-%d').date()
            new_event = Event(name=json['name'], event_date=event_date)
            db.session.add(new_event)
            db.session.commit()
            return new_event.to_dict(), 201
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400

class OrderResource(Resource):

    def get(self):
        order_dicts = [order.to_dict() for order in Order.query.all()]
        return order_dicts, 200

    def post(self):
        try:
            json = request.get_json()
            new_order = Order(
                customer=json['customer'],
                phone=json['phone'],
                address=json['address'],
                delivery_details=json['delivery_details'],
                event_id=json['event_id']
            )
            db.session.add(new_order)
            db.session.commit()
            return new_order.to_dict(), 201
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400

class ItemResource(Resource):

    def get(self):
        item_dicts = [item.to_dict() for item in Item.query.all()]
        return item_dicts, 200

    def post(self):
        try:
            json = request.get_json()
            new_item = Item(
                item_type=json['item_type'],
                special_requests=json['special_requests'],
                wristlet_id=json['wristlet_id'],
                flower_id=json['flower_id'],
                ribbon_color=json['ribbon_color'],
                accent_id=json['accent_id'],
                order_id=json['order_id']
            )
            db.session.add(new_item)
            db.session.commit()
            return new_item.to_dict(rules=('order.event',)), 201
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400

class FullOrderResource(Resource):

    def post(self):
        json = request.get_json()
        try:
            with db.session.begin():
                order = Order(
                customer=json['customer'],
                phone=json['phone'],
                address=json['address'],
                delivery_details=json['delivery_details'],
                event_id=json['event_id']
                )
                db.session.add(order)
                db.session.flush()

                items = []
                for item in json['items']:
                    cleaned_item = {
                        **item,
                        'order_id': order.id
                    }
                    if not cleaned_item.get('accent_id'):
                        cleaned_item.pop('accent_id', None)
                    if not cleaned_item.get('wristlet_id'):
                        cleaned_item.pop('wristlet_id', None)
                    
                    item = Item(**cleaned_item)
                    db.session.add(item)
                    items.append(item)

            return {
                "order": order.to_dict(),
                "items": [item.to_dict() for item in items]
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400


class ItemByID(Resource):
    
    def get(self, id):
        item_dict = Item.query.filter_by(id=id).first().to_dict()
        return item_dict, 200

    def patch(self, id):
        item = Item.query.filter_by(id=id).first()
        json = request.get_json()
        for attr, value in json.items():
            setattr(item, attr, value)

        db.session.add(item)
        db.session.commit()

        return item.to_dict(), 200

    def delete(self, id):
        item = Item.query.filter_by(id=id).first()
        if item:
            db.session.delete(item)
            db.session.commit()

            return "", 204
        return {"error": "Item not found"}, 404

class OrderByID(Resource):

    def get(self, id):
        order_dict = Order.query.filter_by(id=id).first().to_dict()
        return order_dict, 200

    def patch(self, id):
        order = Order.query.filter_by(id=id).first()
        json = request.get_json()
        for attr, value in json.items():
            setattr(order, attr, value)

        db.session.add(order)
        db.session.commit()

        return order.to_dict(), 200

    def delete(self, id):
        order = Order.query.filter_by(id=id).first()
        if order:
            db.session.delete(order)
            db.session.commit()
        
            return "", 204
        return {"error": "Order not found"}, 404

class WristletResource(Resource):

    def get(self):
        wristlet_dicts = [wristlet.to_dict() for wristlet in Wristlet.query.all()]
        return wristlet_dicts, 200

    def post(self):
        try:
            json = request.get_json()
            new_wristlet = Wristlet(color=json['color'], style=json['style'])
            db.session.add(new_wristlet)
            db.session.commit()

            return new_wristlet.to_dict(), 201
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400


class FlowerResource(Resource):
    
    def get(self):
        flower_dicts = [flower.to_dict() for flower in Flower.query.all()]
        return flower_dicts , 200

    def post(self):
        try:
            json = request.get_json()
            new_flower = Flower(name=json['name'], color=json['color'])
            db.session.add(new_flower)
            db.session.commit()

            return new_flower.to_dict(), 201
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400

class AccentResource(Resource):

    def get(self):
        accent_dicts = [accent.to_dict() for accent in Accent.query.all()]
        return accent_dicts, 200

    def post(self):
        try:
            json = request.get_json()
            new_accent = Accent(color=json['color'])
            db.session.add(new_accent)
            db.session.commit()

            return new_accent.to_dict(), 201
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400

api.add_resource(Home, '/api')
api.add_resource(EventResource, '/api/events')
api.add_resource(OrderResource, '/api/orders')
api.add_resource(ItemResource, '/api/items')
api.add_resource(FullOrderResource, '/api/orders/full')
api.add_resource(ItemByID, '/api/items/<int:id>')
api.add_resource(OrderByID, '/api/orders/<int:id>')
api.add_resource(WristletResource, '/api/wristlets')
api.add_resource(FlowerResource, '/api/flowers')
api.add_resource(AccentResource, '/api/accents')


if __name__ == '__main__':
    app.run(port=5555, debug=True)