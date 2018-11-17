def success(message): 
    return {
        "type": "SUCCESS",
        "payload": message
    }

def error(message):
    return {
        "type": "ERROR",
        "payload": message 
    }

def newChoice(id, title, user):
    return {
        "type": "ADD_CHOICE",
        "payload": {
            "id": id,
            "title": title,
            "user": user
        }
    }
