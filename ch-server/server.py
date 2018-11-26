from flask import Flask, request
from flask import render_template, jsonify

import json

from flask_cors import CORS

from flask_socketio import SocketIO, send, emit

from data.choices import addChoice, getChoice
from data.users import addUser, getUser
from data.tokens import addToken, getToken, deleteToken
from data.lists import addList, getList, addListUser, addListChoice

from actions import success, error, createChoice

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
        theList = action['list']
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
            token = getToken(user=user)
            if token is not None:
                deleteToken(token)
                print "WARN: Account breach"

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
        choice = addChoice(user, payload['title'])
        socket.emit('action', createChoice(choice.id, \
                              choice.title, user.id), \
                              room=theList)
        return jsonify(success({
            "id": choice.id,
            "user": choice.user,
            "title": choice.title 
        }))
        
    if theType == "UPDATE_CHOICE":
        choice = getChoice(id=payload['id'])
        socket.emit('action', createChoice(choice.id, \
                              choice.title, user.id), \
                              room=theList)

        return jsonify(success("Update Choice!"))

    if theType == "READ_CHOICES":
        choices = getChoice(theList=theList)
        return jsonify(success(choices))

    if theType == "CREATE_LIST":
        if getList(title=payload['title']) is not None:
            return jsonify(error("List exists"))

        theList = addList(payload['title'], user)

        return jsonify(success({
            "title": theList.title,
            "url": theList.url,
            "id": theList.id,
        }))

    if theType == "JOIN_LIST":
        theList = getList(url=payload['url'])
        if theList is None:
            return jsonify(error("Invalid URL"))

        return jsonify(success({
            "title": theList.title,
            "url": theList.url,
            "id": theList.id,
        }))

    if theType == "ADD_VOTE":
        matchID = payload['matchID']
        vote = payload['vote']
        addVote(matchID, voteA)

        socket.emit('action', error("hello"), room=theList)
        return jsonify(success("Add Vote!"))

        
    if theType == "LEAVE_LIST":
        return jsonify(success("Leave List!!"))

