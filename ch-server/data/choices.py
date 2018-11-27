import time

from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

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

    def toDict(self):
        return {
            "id": self.id,
            "user": self.user,
            "title": self.title
        }

def addChoice(user, title):
    return Choice(user, title)

def setChoice(choice, title):
    choice.title = title
    session.commit()

def getChoice(id=None, title=None):
    if id is not None:
        return session.query(Choice).get(id) 

    titleFilter = (Choice.title == title) \
        if (title is None) else (True)

    choices = session.query(Choice) \
        .filter(userFilter).first()

createAll()
