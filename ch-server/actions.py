def send(io, room, action):
    io.emit('action', action, room=room)

def success(message): 
    return {
        "type": "REQUEST_SUCCESS",
        "payload": message
    }

def showSuccess(message):
    return {
        "type": "SHOW_SUCCESS",
        "payload": message
    }

def reject(message):
    return {
        "type": "REQUEST_REJECT",
        "payload": message 
    }

def error(message):
    return {
        "type": "REQUEST_ERROR",
        "payload": message 
    }

def updateChoice(choice):
    return {
        "type": "UPDATE_CHOICE",
        "payload": choice.toDict()
    }

def updateVote(vote):
    return {
        "type": "UPDATE_VOTE",
        "payload": vote.toDict()
    }

def updateBracket(theList):
    return {
        "type": "UPDATE_BRACKET",
        "payload": theList.toDict()
    }

def updateUser(user):
    return {
        "type": "UPDATE_USER",
        "payload": user.toDict()
    }
