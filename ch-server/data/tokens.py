from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from data.users import getUser

class Token(Base):
    __tablename__ = 'token'

    user = Column('user', Integer)
    room = Column('room', Integer)
    token = Column('token', String, primary_key=True)

    def __init__(self, user, room):
        self.user = user
        session.add(self)
        session.commit()
