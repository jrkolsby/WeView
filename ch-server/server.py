from flask import Flask, request
from flask import render_template, jsonify

import json

from flask_cors import CORS

from flask_socketio import SocketIO, send, emit

from actions import success, error, newChoice

from data.choices import addChoice, getChoices
from data.users import addUser, getUser
from data.tokens import addToken, getToken, deleteToken


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
        list = action['list']
        user = action['user']
        token = action['token']
        theType = action['type'] 
        payload = action['payload']
    except:
        return jsonify(error("Bad Action"))

    if theType == "LOGIN":
        username = payload['user']
        password = payload['pass']

        user = getUser(name=username, password=password)
        if user is not None:
            token = addToken(user)
            return jsonify(success({
                "id": user.id,
                "token": token.token
            }))
        
        print "WARN: Bad Login"
        return jsonify(error("Bad Login"))
    
    if theType == "SIGNUP":
        username = payload['user']
        password = payload['pass']
        
        if getUser(name=username) is None:
            user = addUser(username, password)
            token = addToken(user)
            return jsonify(success({
                "id": user.id,
                "token": token.token
            }))

        return jsonify(error("Username taken"))
    
    # Validate existing user
    user = getUser(id=user)
    if user is None:
        print "WARN Invalid user"
        return jsonify(error("Invalid User"))

    # Validate token
    token = getToken(token=token, user=user)
    if token is None:
        print "WARN Invalid token"
        return jsonify(error("Invalid Token"))
    
    if theType == "LOGOUT":
        deleteToken(token)
        return jsonify(success("Deleted Token!"))

    if theType == "CREATE_CHOICE":
        choice = addChoice(user, payload)
        socket.to(list).emit('action', newChoice(id, payload, user))
        return jsonify(success("Read Choices!"))

    if theType == "READ_CHOICES":
        return jsonify(success("Read Choices!"))

    if theType == "UPDATE_CHOICE":
        return jsonify(success("Update Choice!"))
    
    if theType == "ADD_VOTE":
        payload = action['payload']
        matchID = payload['matchID']
        voteA = payload['voteA']
        addVote(matchID, voteA)

        socket.to(list).emit('action', error("hello"))
        return jsonify(success("Add Vote!"))

    if theType == "CREATE_LIST":
        return jsonify(success("Create List!"))

    if theType == "JOIN_LIST":
        return jsonify(success("Join List!"))

    if theType == "LEAVE_LIST":
        return jsonify(success("Leave List!!"))

