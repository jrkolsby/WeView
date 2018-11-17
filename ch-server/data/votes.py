from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from data.users import getUser, User

class Vote(Base):
    __tablename__ = 'votes'
    __table_args__ = (
        UniqueConstraint("choice-a", "choice-b"),
    )

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer, primary_key=True)
    match = Column('match', Integer, primary_key=True)
    voteForA = Column('voteForA', Boolean)

    def __init__(self, user, match, voteForA):
        self.user = user.id
        self.match = choice.id
        session.add(self)
        session.commit()

