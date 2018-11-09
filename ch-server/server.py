from flask import Flask, request
from flask import render_template, jsonify 

from flask_cors import CORS

from flask_login import LoginManager, UserMixin

from flask_socketio import SocketIO, send, emit

'''
from data.messages 
from data.movies import 
from data.votes import addMessage, getMessages, addVote
'''

from data.users import addUser, getUser

app = Flask(__name__)
CORS(app)

login = LoginManager(app)
socketio = SocketIO(app)

def success(payload): 
    return jsonify({
        "type": "SUCCESS",
        "payload": payload
    })

def error(payload):
    return jsonify({
        "type": "ERROR",
        "payload": payload 
    })

@app.route("/signup", methods=['GET', 'POST', 'DELETE'])
def signup():
    username = request.form.get('user')
    password = request.form.get('pass')

    if username == "" or password == "":
        return error("Incomplete Credentials")

    if getUser(username) is not None:
        return error("User exists")
    
    user = addUser(username, password)

    return success(user.getToken(password))

@app.route("/login", methods=['POST'])
def login():
    username = request.form.get('user')
    password = request.form.get('pass')

    if username == "" or password == "":
        return error("Incomplete Credentials")

    user = getUser(username)

    if user is None:
        return error("No such user")
    
    token = user.getToken(password)

    if token is None:
        return error("Invalid Password")

    return success(token)

