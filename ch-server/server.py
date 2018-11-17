from flask import Flask, request
from flask import render_template, jsonify

import json

from flask_cors import CORS

from flask_login import LoginManager, UserMixin

from flask_socketio import SocketIO, send, emit

from actions import success, error, newChoice

from data.choices import addChoice, getChoices
from data.users import addUser, getUser
'''
from data.matches import addMatch, getMatches
from data.votes import addVote, getVotes
'''

app = Flask(__name__)
CORS(app)

login = LoginManager(app)
socketio = SocketIO(app)

@socketio.on('action')
def handleAction(action):
    
    print action
    theType = action['type']
    room = action['room']
    user = action['user']
    token = action['token']

    user = getUser(user)
    if user is not None and user.verifyToken(token):
        if theType == "SOCKET_VOTE":
            payload = action['payload']
            matchID = payload['matchID']
            voteA = payload['voteA']
            addVote(matchID, voteA)

        elif theType == "SOCKET_ADD_CHOICE":
            payload = action['payload']
            choice = addChoice(user, payload)
            #emit('action', newChoice(id, payload, user), broadcast = True)
    else:
        emit('action', error("SOCKET NOT FOUND"), broadcast = True)
        

@app.route("/api", methods=['POST'])
def userAPI():

    print action
    theType = action['type']
    room = action['room']
    user = action['user']
    token = action['token']

    user = getUser(user)
    if user is not None and user.verifyToken(token):
        if theType == "SOCKET_VOTE":
            payload = action['payload']
            matchID = payload['matchID']
            voteA = payload['voteA']
            addVote(matchID, voteA)
            emit('action', error("hello"), broadcast = True)

        elif theType == "SOCKET_ADD_CHOICE":
            payload = action['payload']
            choice = addChoice(user, payload)
            #emit('action', newChoice(id, payload, user), broadcast = True)
    else:
        emit('action', error("hello"), broadcast = True)

@socketio.on('message')
def handleSocket(packet):
    packetType = packet['type']
    payload = packet['payload']

    username = payload['username']
    token = payload['token']
    user = getUser(username)

    if user is not None and user.verifyToken(token):

        if packetType == "MESSAGE":

            content = payload['content']
            send(message(username, content), broadcast = True)
            addMessage(username, content)

        elif packetType == "VOTE":
            messageID = payload['messageID']

            newCount = addVote(messageID)
            send(vote(messageID, newCount))

    else:
        print "WARN: Unverified user"


@app.route("/api/user/signup", methods=['GET', 'POST', 'DELETE'])
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

