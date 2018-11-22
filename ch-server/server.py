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

socket = SocketIO(app)

votingQueues = {}

@app.route("/api", methods=['POST'])
def api():

    action = request.get_json(force=True)
    
    try:
        room = action['list']
        user = action['user']
        token = action['token']
        aType = action['type'] 
    except:
        return jsonify(error("Bad Action"))

    if aType == "LOGIN":
        payload = action['payload']
        loginUser = payload['user']
        loginPass = payload['pass']
        return jsonify(success("Login"))
    
    user = getUser(user)
    if user is not None and user.verifyToken(token):
        if aType == "SOCKET_VOTE":
            payload = action['payload']
            matchID = payload['matchID']
            voteA = payload['voteA']
            addVote(matchID, voteA)

            socket.to(room).emit('action', error("hello"))
            return jsonify(success("emiited!"))

        elif aType == "SOCKET_ADD_CHOICE":
            payload = action['payload']
            choice = addChoice(user, payload)

            socket.to(room).emit('action', newChoice(id, payload, user))
            return jsonify(success("emiited!"))
    else:
        print "WARN Unauthenticated user"
        return jsonify(error("Invalid User"))

