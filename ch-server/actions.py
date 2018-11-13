def success(payload): 
    return {
        "type": "SUCCESS",
        "payload": payload
    }

def error(payload):
    return {
        "type": "ERROR",
        "payload": payload 
    }
