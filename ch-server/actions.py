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

def createChoice(id, title, user):
    return {
        "type": "CREATE_CHOICE",
        "payload": {
            "id": id,
            "title": title,
            "user": user
        }
    }
