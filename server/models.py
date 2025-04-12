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
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    delivery_details = db.Column(db.String)

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    event = db.relationship('Event', back_populates='orders')
    items = db.relationship('Item', back_populates='order', cascade='all, delete-orphan')

    serialize_rules = ('-event.orders', '-items.order')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Event name must be provided.")
        return name

    @validates('phone')
    def validate_phone(self, key, phone):
        phone = phone.strip()
        if phone.startswith('1') and len(phone) == 11:
            phone = phone[1:]
        if len(phone) != 10 or not phone.isdigit():
            raise ValueError("Phone number invalid. Must be 10 digits and contain only numbers.")
        return phone

    @validates('event_id')
    def validate_event_id(self, key, event_id):
        if not db.session.get(Event, event_id):
            raise ValueError("Event not found.")
        return event_id

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    item_type = db.Column(db.String, nullable=False)
    item_status = db.Column(db.String)
    special_requests = db.Column(db.String)

    wristlet_id = db.Column(db.Integer, db.ForeignKey('wristlets.id'))
    flower_id = db.Column(db.Integer, db.ForeignKey('flowers.id'), nullable=False)
    ribbon_id = db.Column(db.Integer, db.ForeignKey('ribbons.id'), nullable=False)
    accent_id = db.Column(db.Integer, db.ForeignKey('accents.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)

    wristlet = db.relationship('Wristlet', back_populates='items')
    flower = db.relationship('Flower', back_populates='items')
    ribbon = db.relationship('Ribbon', back_populates='items')
    accent = db.relationship('Accent', back_populates='items')
    order = db.relationship('Order', back_populates='items')

    serialize_rules = ('-order.items', '-wristlet.items', '-flower.items', '-ribbon.items', '-accent.items', '-order.items')


class Wristlet(db.Model, SerializerMixin):
    __tablename__ = "wristlets"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)
    style = db.Column(db.String)

    items = db.relationship('Item', back_populates='wristlet')

    serialize_rules = ('-items.wristlet',)

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

    items = db.relationship('Item', back_populates='flower')

    serialize_rules = ('-items.flower',)

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

    items = db.relationship('Item', back_populates='ribbon')

    serialize_rules = ('-items.ribbon',)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color

class Accent(db.Model, SerializerMixin):
    __tablename__ = "accents"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)

    items = db.relationship('Item', back_populates='accent')

    serialize_rules = ('-items.accent',)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color