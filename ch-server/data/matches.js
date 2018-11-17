from data import Base, session, createAll

from data import Column, Integer, String, UniqueConstraint

from data.users import User, getUser

class Match(Base):
    __tablename__ = 'matches'
    __table_args__ = (
        UniqueConstraint("choice-a", "choice-b"),
    )

    id = Column('id', Integer, primary_key=True)
    room = Column('room', Integer, primary_key=True)
    choiceA = Column('choice-a', Integer, primary_key=True)
    choiceB = Column('choice-b', Integer, primary_key=True)

    def __init__(self, choiceA, choiceB):
        self.choiceA = choiceA.id
        self.choiceB = choiceB.id
        session.add(self)
        session.commit()

def addMatch(choiceA, choiceB):
    return Match(choiceA, choiceB)
