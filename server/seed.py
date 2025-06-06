#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import date

# Local imports
from app import app
from models import db, Event, Order, Wristlet, Flower, Ribbon, Accent

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        ## REMOVE RIBBON MODEL AND ADD RIBBON COLOR ATTRIBUTE IF RESEEDING ##

        # Seed code goes here!
        # print("Deleting data...")
        # Event.query.delete()
        # Wristlet.query.delete()
        # Flower.query.delete()
        # Ribbon.query.delete()
        # Accent.query.delete()

        # print("Creating events...")
        # event1 = Event(name='St. Francis Jr. Prom', event_date=date(2025, 4, 11))
        # event2 = Event(name='St. Francis Senior Ball', event_date=date(2025, 4, 12))
        # events = [event1, event2]
        # db.session.add_all(events)

        # print("Creating orders...")
        # order1 = Order(customer="Liberty Sanchez", phone="19162131440", address="3021 10th Ave", event_id=2)
        # orders = [order1]
        # db.session.add_all(orders)

        # print("Creating wristlets...")
        # wristlet1 = Wristlet(color='gold', style='rhinestone')
        # wristlet2 = Wristlet(color='silver', style='rhinestone')
        # wristlet3 = Wristlet(color='pearl')
        # wristlets = [wristlet1, wristlet2, wristlet3]
        # db.session.add_all(wristlets)

        # print("Creating flowers...")
        # flower1 = Flower(name='spray rose', color='white')
        # flower2 = Flower(name='spray rose', color='red')
        # flower3 = Flower(name='spray rose', color='pink')
        # flower4 = Flower(name='spray rose', color='hot pink')
        # flowers = [flower1, flower2, flower3, flower4]
        # db.session.add_all(flowers)

        # print("Creating ribbons...")
        # ribbon1 = Ribbon(color='white')
        # ribbon2 = Ribbon(color='ivory')
        # ribbon3 = Ribbon(color='light pink')
        # ribbon4 = Ribbon(color='hot pink')
        # ribbons = [ribbon1, ribbon2, ribbon3, ribbon4]
        # db.session.add_all(ribbons)

        # print("Creating accents...")
        # accent1 = Accent(color='gold')
        # accent2 = Accent(color='silver')
        # accents = [accent1, accent2]
        # db.session.add_all(accents)

        
        # db.session.commit()

        print("Seeding done!")
