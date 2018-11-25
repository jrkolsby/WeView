from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from data.users import getUser, User

class Vote(Base):
    __tablename__ = 'votes'
    __table_args__ = (
        UniqueConstraint("choice-a", "choice-b"),
    )

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    theList = Column('list', Integer)
    voteIndex = Column('voteIndex', Boolean)
    bracketIndex = Column('bracketIndex', Integer)

    def __init__(self, user, theList, bracketIndex, voteIndex):
        self.user = user.id
        self.theList = theList.id
        self.theList = theList.id
        self.theList = theList.id
        session.add(self)
        session.commit()

