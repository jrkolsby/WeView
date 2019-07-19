from data import Base, session, createAll
from data import Column, Integer, String, UniqueConstraint

from passlib.apps import custom_app_context as pwd

class User(Base):
    __tablename__ = 'users'
    __table_args__ = (
        UniqueConstraint("username"),
    )

    id = Column('id', Integer, primary_key=True)
    username = Column('username', String)
    password = Column('password', String)

    def __init__(self, username, password):
        self.username = username
        self.password = pwd.encrypt(password)
        session.add(self)
        session.commit()

    def toDict(self):
        return {
            "id": self.id,
            "name": self.username
        }

def addUser(username, password, theList=None):
    print("NEW USER: " + username)
    return User(username, password)

def getUser(id=None, name=None, password=None, theList=None):
    if id is not None:
        return session.query(User).get(id) 

    nameFilter = (User.username == name) \
        if (name is not None) else (True)

    user = session.query(User) \
        .filter(nameFilter) \
        .first()

    if user is not None and \
       password is not None and not \
       pwd.verify(password, user.password):
        return None

    return user

createAll()
