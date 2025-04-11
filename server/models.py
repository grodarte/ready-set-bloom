from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

from datetime import datetime

class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    event_date = db.Column(db.Date, nullable=False)

    orders = db.relationship('Order', back_populates='event', cascade='all, delete-orphan')

    serialize_rules = ('-orders.event',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Event name must be provided.")
        return name

    @validates('event_date')
    def validate_event_date(self, key, event_date):
        if event_date < datetime.now().date() or not event_date:
            raise ValueError("Event date must be in the future.")
        return event_date

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone = db.Column(db.String)
    address = db.Column(db.String)
    delivery_details = db.Column(db.String)

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    event = db.relationship('Event', back_populates='orders')

    serialize_rules = ('-event.orders',)

class Wristlet(db.Model, SerializerMixin):
    __tablename__ = "wristlets"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)
    style = db.Column(db.String)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color

class Flower(db.Model, SerializerMixin):
    __tablename__ = "flowers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    color = db.Column(db.String, nullable=False)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name must be provided.")
        return name

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color

class Ribbon(db.Model, SerializerMixin):
    __tablename__ = "ribbons"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color

class Accent(db.Model, SerializerMixin):
    __tablename__ = "accents"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color


# class Item(db.Model, SerializerMixin):
#     __tablename__ = "items"

#     id = db.Column(db.Integer, primary_key=True)
#     item_type = db.Column(db.String)
#     item_status = db.Column(db.String)
#     wristlet_id = db.Column(db.Integer, db.ForeignKey('wristlets.id'))
#     flower_id = db.Column(db.Integer, db.ForeignKey('flowers.id'))
#     ribbon_id = db.Column(db.Integer, db.ForeignKey('ribbons.id'))
#     accent_id = db.Column(db.Integer, db.ForeignKey('accents.id'))
#     order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
#     special_requests = db.Column(db.String)