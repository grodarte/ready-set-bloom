from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

from datetime import datetime

ITEM_TYPES = ['corsage', 'boutonniere', 'bouquet']
ITEM_STATUSES = ['new', 'prepped', 'complete']

class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    event_date = db.Column(db.Date, nullable=False)

    orders = db.relationship('Order', back_populates='event', cascade='all, delete-orphan')

    items = association_proxy('orders', 'items')
    wristlets = association_proxy('orders', 'wristlets')
    flowers = association_proxy('orders', 'flowers')
    accents = association_proxy('orders', 'accents')

    serialize_rules = ('-items.order', '-wristlets.items', '-flowers.items', '-accents.items')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Event name must be provided.")
        return name.strip()

    @validates('event_date')
    def validate_event_date(self, key, event_date):
        if event_date < datetime.now().date() or not event_date:
            raise ValueError("Event date must be in the future.")
        return event_date

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    customer = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    delivery_details = db.Column(db.String)

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    event = db.relationship('Event', uselist=False, back_populates='orders')
    items = db.relationship('Item', back_populates='order', cascade='all, delete-orphan')

    wristlets = association_proxy('items', 'wristlet')
    flowers = association_proxy('items', 'flower')
    accents = association_proxy('items', 'accent')

    serialize_rules = ('-event.orders', '-items.order')

    @validates('customer')
    def validate_customer(self, key, name):
        if not name:
            raise ValueError("Customer name must be provided.")
        return name.strip()

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
    item_status = db.Column(db.String, default="new")
    ribbon_color = db.Column(db.String, nullable=False)
    special_requests = db.Column(db.String)

    wristlet_id = db.Column(db.Integer, db.ForeignKey('wristlets.id'))
    flower_id = db.Column(db.Integer, db.ForeignKey('flowers.id'), nullable=False)
    accent_id = db.Column(db.Integer, db.ForeignKey('accents.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)

    wristlet = db.relationship('Wristlet', uselist=False, back_populates='items')
    flower = db.relationship('Flower', uselist=False, back_populates='items')
    accent = db.relationship('Accent', uselist=False, back_populates='items')
    order = db.relationship('Order', uselist=False, back_populates='items')

    event = association_proxy('order', 'event')

    serialize_rules = ('-order.items', '-wristlet.items', '-flower.items', '-accent.items', '-order.items')

    @validates('item_type')
    def validate_item_type(self, key, item_type):
        item_type = item_type.lower().strip()
        if item_type not in ITEM_TYPES:
            raise ValueError(f'Invalid item type: {item_type}')
        return item_type

    @validates('item_status')
    def validate_item_status(self, key, status):
        status = status.lower().strip()
        if status not in ITEM_STATUSES:
            raise ValueError(f'Invalid item status: {status}')
        return status

    @validates('ribbon_color')
    def validate_ribbon_color(self, key, color):
        color = color.lower().strip()
        if not color:
            raise ValueError("Ribbon color must be provided.")
        return color

    @validates('wristlet_id')
    def validate_wristlet_id(self, key, wristlet_id):
        if not self.item_type:
            raise ValueError('Item type must be provided before wristlet id.')
        if self.item_type == 'corsage' and not wristlet_id:
            raise ValueError('Wristlet is required for corsages.')
        if wristlet_id and not db.session.get(Wristlet, wristlet_id):
            raise ValueError("Wristlet not found.")
        return wristlet_id

    @validates('flower_id')
    def validate_flower_id(self, key, flower_id):
        if not db.session.get(Flower, flower_id):
            raise ValueError("Flower not found.")
        return flower_id


    @validates('accent_id')
    def validate_accent_id(self, key, accent_id):
        if accent_id and not db.session.get(Accent, accent_id):
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

    serialize_rules = ('-items',)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color.lower().strip()

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

    serialize_rules = ('-items',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name must be provided.")
        return name.lower().strip()

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color.lower().strip()

class Accent(db.Model, SerializerMixin):
    __tablename__ = "accents"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)

    items = db.relationship('Item', back_populates='accent')

    serialize_rules = ('-items',)

    @validates('color')
    def validate_color(self, key, color):
        color = color.lower().strip()
        allowed = ['gold', 'silver', 'black']
        if color not in allowed:
            raise ValueError("Color must be provided.")
        return color