from flask import Flask, request
from flask import render_template, jsonify

from flask_cors import CORS

from flask_socketio import SocketIO, emit, join_room, leave_room

from data.choices   import addChoice,   getChoice,  setChoice
from data.tokens    import addToken,    getToken,   deleteToken
from data.users     import addUser,     getUser
from data.lists     import addList,     getList, \
        addListUser, addListChoice, addListVote, \
        makeURL, BRACKET_SIZE

from actions import success, error, reject, send, \
        showSuccess, updateChoice, updateUser, updateBracket, \
        updateResults, updateRound

app = Flask(__name__)
CORS(app)

io = SocketIO(app)

def compareBrackets(old, new):
    size = len(old)
    delta = []
    for i in range(size):
        delta.append(new[i] != old[i] and len(new[i]) > 1)
    return delta

def roundRange(n):
    return range(2**(4-n), 2**(5-n))

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
        try:
            username = payload['user']
            password = payload['pass']
        except:
            return jsonify(error("Bad Action"))
        
        if getUser(name=username) is not None:
            return jsonify(error("Username taken"))

        user = addUser(username, password)
        token = addToken(user)

        return jsonify(success(token.toDict()))

    
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
        theList = getList(id=theList)
        if theList is None:
            return jsonify(error("No such list"))

        if user not in theList.getUsers():
            return jsonify(error("Not a member"))

        if len(theList.getChoices()) >= BRACKET_SIZE:
            return jsonify(error("Too many choices!"))

        if theList.theRound > 1:
            return jsonify(reject("Create new"))

        choice = addChoice(user, "") 

        addListChoice(theList, choice, user)

        send(io, theList.url, updateChoice(choice))
        send(io, theList.url, updateBracket(theList.getBracket()))

        return jsonify(success(choice.toDict()))

    if theType == "CREATE_VOTE":
        try:
            vote = payload['vote']
            index = payload['index']
        except:
            return jsonify(error("Bad Action"))

        theList = getList(id=theList)

        if theList is None:
            return jsonify(error("No such list"))

        if user not in theList.getUsers():
            return jsonify(error("Not a member"))

        if index > 0:
            if len(theList.getVotes(user=user, index=index)) > 0:
                return jsonify(error("Already voted"))

            # create vote and remove from user's queue
            vote = addListVote(theList, user, index, vote) 

        activeUsers = len(theList.getUsers())
        proceed = True

        bracket = theList.getBracket()

        for i in theList.roundRange():
            if len(bracket[i]) > 1 and len(theList.getVotes(index=i)) < activeUsers:
                proceed = False

        if proceed:
            theList.proceed()
            print "PROCEEDING"
            print map(lambda c: c.toDict(), theList.getChoices())
            print theList.getBracket()
            print theList.getResults()
            print theList.roundRange()
            send(io, theList.url, updateResults(theList.getResults()))
            send(io, theList.url, updateBracket(theList.getBracket()))
            send(io, theList.url, updateRound(theList.roundRange()))

        return jsonify(success("VOTED"))

    if theType == "UPDATE_CHOICE":
        choice = getChoice(id=payload['id'])
        if choice is None:
            return jsonify(error("No such choice"))

        if choice.user != user.id:
            return jsonify(error("No persmission"))

        theList = getList(id=theList)
        if theList is None:
            return jsonify(error("No such list"))

        # Set to database
        setChoice(choice, payload['title'])

        send(io, theList.url, updateChoice(choice))

        return jsonify(success(choice.toDict()))

    if theType == "CREATE_LIST":
        try:
            title = payload['title']
        except:
            return jsonify(error("Bad Action"))

        if getList(url=makeURL(title)) is not None:
            return jsonify(error("List exists"))

        theList = addList(title, user)

        return jsonify(success(theList.toDict()))

    if theType == "JOIN_LIST":
        theList = getList(url=payload['url'])

        if theList is None:
            return jsonify(error("Invalid URL")) 

        addListUser(theList, user)

        send(io, theList.url, updateUser(user))

        return jsonify(success(theList.toDict()))
 
    if theType == "LEAVE_LIST":
        return jsonify(success("Leave List!!"))
