from flask import Flask, request
from flask import render_template, jsonify

import json

from flask_cors import CORS

from flask_socketio import SocketIO, emit, join_room, leave_room

from data.choices   import addChoice,   getChoice,  setChoice
from data.tokens    import addToken,    getToken,   deleteToken
from data.users     import addUser,     getUser
from data.lists     import addList,     getList,    addListUser, addListChoice

from actions import success, error, send, \
        updateChoice, updateUser, showSuccess, updateBracket

'''
from data.matches import addMatch, getMatches
from data.votes import addVote, getVotes
'''

app = Flask(__name__)
CORS(app)

io = SocketIO(app)

voteQueues = {
    1: [{
        "listID": 1,
        "bracketID": 5
    }]
}

@io.on('join')
def join(action):
    try:
        user = action['user']
        token = action['token']
        room = action['payload']['url']
    except:
        print "BAD ACTION"
        return
    
    user = getUser(id=user)
    if user is None:
        print "WARN Invalid user"
        return 

    # Validate token
    token = getToken(token=token, user=user)
    if token is None:
        print "WARN Invalid token"
        return 

    print "JOINED ROOM"
    join_room(room)
    send(io, room, showSuccess(user.username + " joined /" + room))

@io.on('leave')
def leave(action):
    try:
        user = action['user']
        token = action['token']
        listID = action['list']
    except:
        print "BAD ACTION"
        return

    room = getList(id=listID)
    if list is None:
        print "WARN Invalid list"
        return
    
    user = getUser(id=user)
    if user is None:
        print "WARN Invalid user"
        return 

    leave_room(room.url)
    send(io, room.url, showSuccess(user.username + " left /" + room.url))

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

        print theList.bracket

        send(io, theList.url, updateBracket(theList))

        return jsonify(success(choice.toDict()))
        
    if theType == "UPDATE_CHOICE":
        choice = getChoice(id=payload['id'])
        if choice is None:
            return jsonify(error("No such choice"))

        # Set to database
        setChoice(choice, payload['title'])

        theList = getList(id=theList)
        if theList is None:
            return jsonify(error("No such list"))

        send(io, theList.url, updateChoice(choice))

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

        send(io, theList.url, updateUser(user))

        return jsonify(success(theList.toDict()))

    if theType == "ADD_VOTE":
        choice = payload['choice']
        
        print choice

        io.emit('action', error("hello"), room=theList)
        return jsonify(success("Add Vote!"))

        
    if theType == "LEAVE_LIST":
        return jsonify(success("Leave List!!"))
