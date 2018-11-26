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

def addUser(username, password):
    print "NEW USER: " + username
    return User(username, password)

def getUser(id=None, list=None, name=None, password=None):

    if id is not None:
        return session.query(User).get(id) 

    nameFilter = (True)

    if name is not None:
        nameFilter = (User.username == name)

    users = session.query(User) \
        .filter(nameFilter) \
        .all()

    if len(users) == 0:
        return None

    user = users[0]

    if password is not None and \
       not pwd.verify(password, user.password):
        return None

    return user

createAll()
