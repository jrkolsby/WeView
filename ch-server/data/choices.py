import time

from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from data.users import getUser

class Choice(Base):
    __tablename__ = 'choices'

    id = Column('id', Integer, primary_key=True)
    content = Column('content', String)

    def __init__(self, content):
        self.content = content
        session.add(self)
        session.commit()

def addChoice(user, content):
    theUser = getUser(user)
    if theUser is not None:
        return Owner(theUser, Choice(content)) 
    return None;

def getChoices(user=None):
    userFilter = (True)
    if user is not None:
        userFilter = (Owner.user == getUser(user).id)

    joins = session.query(Owner) \
        .filter(userFilter).all()

    return list(map(lambda x: { \
        "user": session.query(User).get(x.user).name, \
        "id": session.query(Choice).get(x.choice).id, \
        "votes": session.query(Choice).get(x.choice).votes, \
        "content": session.query(Choice).get(x.choice).content \
        }, joins))

createAll()
