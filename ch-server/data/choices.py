import time

from data import Base, session, createAll
from data import Column, Integer, String

from data.users import getUser, User

class Choice(Base):
    __tablename__ = 'choices'

    id = Column('id', Integer, primary_key=True)
    content = Column('content', String)
    time = Column('time', Integer)
    votes = Column('votes', Integer)

    def __init__(self, content):
        self.content = content
        self.time = int(round(time.time() * 1000))
        self.votes = 0
        session.add(self)
        session.commit()

class Join(Base):
    __tablename__ = 'join'

    user = Column('user', Integer, primary_key=True)
    choice = Column('choice', Integer, primary_key=True)

    def __init__(self, user, choice):
        self.user = user.id
        self.choice = choice.id
        session.add(self)
        session.commit()

def addVote(choiceID):
    theChoice = session.query(Choice).get(choiceID)
    theChoice.votes = theChoice.votes + 1
    session.commit()
    return theChoice.votes

def addChoice(user, content):
    theUser = getUser(user)
    if theUser is not None:
        return Join(theUser, Choice(content)) 
    return None;

def getChoices(user=None):
    userFilter = (True)
    if user is not None:
        userFilter = (Join.user == getUser(user).id)

    joins = session.query(Join) \
        .filter(userFilter).all()

    return list(map(lambda x: { \
        "user": session.query(User).get(x.user).name, \
        "id": session.query(Choice).get(x.choice).id, \
        "votes": session.query(Choice).get(x.choice).votes, \
        "content": session.query(Choice).get(x.choice).content \
        }, joins))

createAll()
