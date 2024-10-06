from flask import Blueprint, request, jsonify
from src.controllers.index import game_info_controllers

game_info_routes = Blueprint('game_info_routes', __name__)

@game_info_routes.route('/game_info_route',methods=['POST'])
def info():
    try:
        data = request.get_json()
        resp,code = game_info_controllers.generate_info(data)
        print("_________________")
        print("game_route")
        print(code)
        print(resp)
        return jsonify(resp),code
    except Exception as e:
        return jsonify({"message"f"An error occurred {e}"}),500