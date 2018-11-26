import time
import string

from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from random import choice

TOKEN_EXPIRE = 3600 * 1000
TOKEN_SIZE = 17

class Token(Base):
    __tablename__ = 'tokens'

    id = Column('id', Integer)
    user = Column('user', Integer)
    token = Column('token', String, primary_key=True)
    expire = Column('expire', Integer)

    def __init__(self, user):
        self.user = user.id

        # Generate Token
        alphabet = string.ascii_letters + string.digits
        self.token = ''.join( choice(alphabet) \
            for i in range(TOKEN_SIZE))

        self.expire = getTime() + TOKEN_EXPIRE

        session.add(self)
        session.commit()

def getTime():
    return int(round(time.time() * 1000))

def getToken(id=None, user=None, token=None):

    if id is not None:
        return session.query(Token).get(id) 

    tokenFilter = (True)
    userFilter = (True)

    if token is not None:
        tokenFilter = (Token.token == token)

    if user is not None:
        userFilter = (Token.user == user.id)

    token = session.query(Token) \
        .filter(tokenFilter) \
        .filter(userFilter) \
        .first()

    if token is None:
        return None
    
    if token.expire < getTime():
        return None

    return token

def deleteToken(token):
    session.delete(token)
    session.commit()

def addToken(user):
    return Token(user);

def token(token):
    if token == self.token and self.expire > getTime():
        return True;
    return False;

createAll()
