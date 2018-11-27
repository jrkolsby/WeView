def success(message): 
    return {
        "type": "REQUEST_SUCCESS",
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

def updateUser(user):
    return {
        "type": "UPDATE_USER",
        "payload": user.toDict()
    }
