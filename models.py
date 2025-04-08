from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Wristlet(db.Model, SerializerMixin):
    __tablename__ = "wristlets"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String)
    style = db.Column(db.String)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color

class Flower(db.Model, SerializerMixin):
    __tablename__ = "flowers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    color = db.Column(db.String)

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
    color = db.Column(db.String)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color

class Accent(db.Model, SerializerMixin):
    __tablename__ = "accents"

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String)

    @validates('color')
    def validate_color(self, key, color):
        if not color:
            raise ValueError("Color must be provided.")
        return color
    

# class Order(db.Model, SerializerMixin):
#     __tablename__ = "orders"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     phone = db.Column(db.String)
#     address = db.Column(db.String)
#     event_date = db.Column(db.DateTime)
#     special_requests = db.Column(db.String)
#     order_status = db.Column(db.String)

#     items = db.relationship('Item', back_populates='order', cascade='all, delete-orphan')


# class Item(db.Model, SerializerMixin):
#     __tablename__ = "items"

#     id = db.Column(db.Integer, primary_key=True)
#     item_type = db.Column(db.String)
#     wristlet_id = db.Column(db.Integer, db.ForeignKey('wristlets.id'))
#     flower_id = db.Column(db.Integer, db.ForeignKey('flowers.id'))
#     ribbon_id = db.Column(db.Integer, db.ForeignKey('ribbons.id'))
#     accent_id = db.Column(db.Integer, db.ForeignKey('accents.id'))
#     order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))