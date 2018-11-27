from flask import Flask, request
from flask import render_template, jsonify

import json

from flask_cors import CORS

from flask_socketio import SocketIO, send, emit, join_room, leave_room

from data.choices   import addChoice,   getChoice,  setChoice
from data.tokens    import addToken,    getToken,   deleteToken
from data.users     import addUser,     getUser
from data.lists     import addList,     getList,    addListUser, addListChoice

from actions import success, error, updateChoice, updateUser

'''
from data.matches import addMatch, getMatches
from data.votes import addVote, getVotes
'''

app = Flask(__name__)
CORS(app)

socket = SocketIO(app)

votingQueues = {}

@socket.on('join')
def join(room):
    join_room(room)
    #send(username + ' has entered the room.', room=room)
    print "JOIN_LIST"

@socket.on('leave')
def leave(room):
    leave_room(room)
    print "LEAVE_LIST"
    #send(username + ' has left the room.', room=room)

@app.route("/api", methods=['POST'])
def api():

    action = request.get_json(force=True)
    print action
    
    try:
        theList = action['list']
        user = action['user']
        token = action['token']
        theType = action['type'] 
        payload = action['payload']
    except:
        return jsonify(error("Bad Action"))

    print theType
    
    if theType == "LOGIN":
        try:
            username = payload['user']
            password = payload['pass']
        except:
            return jsonify(error("Bad Action"))

        user = getUser(name=username, password=password)
        if user is not None:

            token = getToken(user=user)

            if token is not None:
                deleteToken(token)
                print "WARN: Account breach"

            token = addToken(user)

            return jsonify(success(token.toDict()))
        
        print "WARN: Bad Login"
        return jsonify(error("Bad Login"))
    
    if theType == "SIGNUP":
        username = payload['user']
        password = payload['pass']
        
        if getUser(name=username) is None:
            user = addUser(username, password)
            token = addToken(user)

            return jsonify(success(token.toDict()))

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
        print user.toDict()
        return jsonify(error("Invalid Token"))
    
    if theType == "LOGOUT":
        deleteToken(token)
        return jsonify(success("Deleted Token!"))

    if theType == "CREATE_CHOICE":
        choice = addChoice(user, "") 

        theList = getList(id=theList)
        if theList is None:
            return jsonify(error("No such list"))

        addListChoice(theList, choice, user)

        return jsonify(success(choice.toDict()))
        
    if theType == "UPDATE_CHOICE":
        choice = getChoice(id=payload['id'])
        if choice is None:
            return jsonify(error("No such choice"))

        setChoice(choice, payload['title'])

        theList = getList(id=theList)
        if theList is None:
            return jsonify(error("No such list"))

        socket.emit('action', updateChoice(choice), \
                              room=theList.url)

        return jsonify(success(choice.toDict()))

    if theType == "CREATE_LIST":
        if getList(title=payload['title']) is not None:
            return jsonify(error("List exists"))

        theList = addList(payload['title'], user)

        return jsonify(success(theList.toDict()))

    if theType == "JOIN_LIST":
        theList = getList(url=payload['url'])

        if theList is None:
            return jsonify(error("Invalid URL")) 

        addListUser(theList, user)

        socket.emit('action', updateUser(user), \
                              room=theList.url)

        return jsonify(success(theList.toDict()))

    if theType == "ADD_VOTE":
        matchID = payload['matchID']
        vote = payload['vote']
        addVote(matchID, voteA)

        socket.emit('action', error("hello"), room=theList)
        return jsonify(success("Add Vote!"))

        
    if theType == "LEAVE_LIST":
        return jsonify(success("Leave List!!"))
