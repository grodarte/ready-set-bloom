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
        name.strip()
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
        name.strip()
        return name

    @validates('phone')
    def validate_phone(self, key, phone):
        phone.strip()
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
    item_status = db.Column(db.String, default="New")
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

    @validates('item_type')
    def validate_item_type(self, key, item_type):
        item_type.lower().strip()
        allowed = ['corsage', 'boutonniere']
        if item_type not in allowed:
            raise ValueError(f'Invalid item type: {item_type}')
        return item_type

    @validates('item_status')
    def validate_item_status(self, key, status):
        status.lower().strip()
        allowed = ['new', 'prepped', 'completed']
        if status not in allowed:
            raise ValueError(f'Invalid item status: {status}')
        return status

    @validates('wristlet_id')
    def validate_wristlet_id(self, key, wristlet_id):
        if not db.session.get(Wristlet, wristlet_id):
            raise ValueError("Wristlet not found.")
        return wristlet_id

    @validates('flower_id')
    def validate_flower_id(self, key, flower_id):
        if not db.session.get(Flower, flower_id):
            raise ValueError("Flower not found.")
        return flower_id

    @validates('ribbon_id')
    def validate_ribbon_id(self, key, ribbon_id):
        if not db.session.get(Ribbon, ribbon_id):
            raise ValueError("Ribbon not found.")
        return ribbon_id

    @validates('accent_id')
    def validate_accent_id(self, key, accent_id):
        if not db.session.get(Accent, accent_id):
            raise ValueError("Accent not found.")
        return accent_id

    @validates('order_id')
    def validate_order_id(self, key, order_id):
        if not db.session.get(Order, order_id):
            raise ValueError("Order not found.")
        return order_id

class Wristlet(db.Model, SerializerMixin):
    __tablename__ = "wristlets"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)
    style = db.Column(db.String)

    items = db.relationship('Item', back_populates='wristlet')

    serialize_rules = ('-items.wristlet',)

    @validates('color')
    def validate_color(self, key, color):
        color.lower().strip()
        if not color:
            raise ValueError("Color must be provided.")
        return color

    @validates('style')
    def validate_style(self, key, style):
        if style:
            return style.lower().strip()

class Flower(db.Model, SerializerMixin):
    __tablename__ = "flowers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    color = db.Column(db.String, nullable=False)

    items = db.relationship('Item', back_populates='flower')

    serialize_rules = ('-items.flower',)

    @validates('name')
    def validate_name(self, key, name):
        name.lower().strip()
        if not name:
            raise ValueError("Name must be provided.")
        return name

    @validates('color')
    def validate_color(self, key, color):
        color.lower().strip()
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
        color.lower().strip()
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
        color.lower().strip()
        allowed = ['gold', 'silver', 'accent']
        if color not in allowed:
            raise ValueError("Color must be provided.")
        return color