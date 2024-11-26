from database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.String(50), unique=True, nullable=False)
    pet_name = db.Column(db.String(50), nullable=False)
    health = db.Column(db.Integer, default=100)
    hunger = db.Column(db.Integer, default=100)
    happiness = db.Column(db.Integer, default=100)
    energy = db.Column(db.Integer, default=100)
    rating = db.Column(db.Integer, default=0)

class StoreItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50), nullable=False)
