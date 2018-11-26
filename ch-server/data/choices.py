import time

from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from data.users import getUser

class Choice(Base):
    __tablename__ = 'choices'

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    title = Column('title', String)

    def __init__(self, user, title):
        self.user = user.id
        self.title = title
        session.add(self)
        session.commit()

def addChoice(user, title):
    return Choice(user, title)

def getChoice(id=None, list=None, title=None):
    if id is not None:
        return session.query(Choice).get(id) 

    titleFilter = (True)

    if title is not None:
        titleFilter = (Choice.title == title)

    choices = session.query(Choice) \
        .filter(userFilter).all()

    return list(map(lambda x: { \
        "user": session.query(User).get(x.user).name, \
        "id": session.query(Choice).get(x.choice).id, \
        "votes": session.query(Choice).get(x.choice).votes, \
        "content": session.query(Choice).get(x.choice).content \
        }, joins))

createAll()
