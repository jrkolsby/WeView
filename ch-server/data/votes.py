from data import Base, session, createAll
from data import Column, Integer, Boolean, UniqueConstraint

from data.users import getUser, User

class Vote(Base):
    __tablename__ = 'votes'

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    vote = Column('vote', Boolean)
    index = Column('index', Integer)
    theList = Column('list', Integer)

    def __init__(self, user, vote, index):
        self.user = user.id
        self.vote = vote
        self.index = index
        session.add(self)
        session.commit()

    def toDict(self):
        return {
            "id": self.id,
            "user": self.user,
            "vote": self.vote,
            "index": self.index,
        }

def getVote(id=None, index=None):
    return session.query(Vote).get(id) 
