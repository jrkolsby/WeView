from flask import Flask, request
from flask import render_template, jsonify

import json

from flask_cors import CORS

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

socketio = SocketIO(app)

@app.route("/api", methods=['POST'])
def api():

    print action
    kind = action['type'] # type
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

