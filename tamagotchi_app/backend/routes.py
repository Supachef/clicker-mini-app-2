from flask import Blueprint, request, jsonify
from database import db
from models import User, StoreItem

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Tamagotchi App!"}), 200

@main.route('/register', methods=['POST'])
def register():
    data = request.json
    telegram_id = data.get('telegram_id')
    pet_name = data.get('pet_name')

    user = User(telegram_id=telegram_id, pet_name=pet_name)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@main.route('/pet/<int:user_id>', methods=['GET'])
def get_pet(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "pet_name": user.pet_name,
            "health": user.health,
            "hunger": user.hunger,
            "happiness": user.happiness,
            "energy": user.energy,
            "rating": user.rating
        }), 200
    return jsonify({"message": "User not found"}), 404

@main.route('/pet/<int:user_id>/action', methods=['POST'])
def perform_action(user_id):
    data = request.json
    action = data.get('action')

    user = User.query.get(user_id)
    if user:
        if action == 'feed':
            user.hunger += 10
        elif action == 'play':
            user.happiness += 10
        elif action == 'heal':
            user.health += 10
        elif action == 'clean':
            user.energy += 10

        user.rating += 5
        db.session.commit()

        return jsonify({"message": f"Action {action} performed successfully"}), 200
    return jsonify({"message": "User not found"}), 404

@main.route('/store', methods=['GET'])
def get_store_items():
    items = StoreItem.query.all()
    return jsonify([{"id": item.id, "name": item.name, "price": item.price, "type": item.type} for item in items]), 200

@main.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    users = User.query.order_by(User.rating.desc()).limit(10).all()
    return jsonify([{"pet_name": user.pet_name, "rating": user.rating} for user in users]), 200
