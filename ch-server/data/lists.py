import re

from data import Base, session, createAll
from data import Column, Integer, String, Boolean, UniqueConstraint

from data.users import getUser
from data.votes import getVote
from data.choices import getChoice

class List(Base):
    __tablename__ = 'lists'

    id = Column('id', Integer, primary_key=True)
    url = Column('url', String)
    title = Column('title', String)

    bracket = Column('bracket', String)

    def __init__(self, title):
        self.title = title
        self.url = re.sub('[\W_]+', '', title.lower())
        session.add(self)
        session.commit()

    def toDict(self):
        return {
            "choices": map(lambda j: getChoice(id=j.choice).toDict(), \
               getListChoices(self)),
            "votes": map(lambda j: getVote(id=j.user).toDict(), \
                getListVotes(self)),
            "users": map(lambda j: getUser(id=j.user).toDict(), \
                getListUsers(self)),
            "bracket": self.bracket,
            "title": self.title,
            "url": self.url,
            "id": self.id,
        }

# JOIN LIST and USER
class ListUser(Base):
    __tablename__ = 'list_users'

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    owner = Column('owner', Boolean)
    theList = Column('theList', Integer)

    def __init__(self, theList, user, owner):
        self.theList = theList.id
        self.user = user.id
        self.owner = owner
        session.add(self)
        session.commit()

# JOIN LIST and VOTE
class ListVote(Base):
    __tablename__ = 'list_votes'

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    theList = Column('theList', Integer)

    def __init__(self, theList, vote):
        self.theList = theList.id
        self.choice = choice.id
        self.user = user.id
        session.add(self)
        session.commit()

# JOIN LIST and CHOICE
class ListChoice(Base):
    __tablename__ = 'list_choices'

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    choice = Column('choice', Integer)
    theList = Column('theList', Integer)

    def __init__(self, theList, choice, user):
        self.theList = theList.id
        self.choice = choice.id
        self.user = user.id
        session.add(self)
        session.commit()

def addList(title, owner):
    theList = List(title)
    member = ListUser(theList, owner, True)
    return theList

def getList(id=None, title=None, url=None):
    if id is not None:
        return session.query(List).get(id) 

    titleFilter = (List.title == title) \
        if title is not None else (True)
    urlFilter = (List.url == url) \
        if url is not None else  (True)

    theList = session.query(List) \
        .filter(titleFilter) \
        .filter(urlFilter) \
        .first()

    return theList

def getListUsers(theList):
    return session.query(ListUser) \
        .filter(ListUser.theList == theList.id).all()

def getListVotes(theList):
    return session.query(ListVote) \
        .filter(ListVote.theList == theList.id).all()

def getListChoices(theList):
    return session.query(ListChoice) \
        .filter(ListChoice.theList == theList.id).all()

def addListChoice(theList, theChoice, theUser):
    return ListChoice(theList, theChoice, theUser)

def addListUser(theList, theUser):
    return ListUser(theList, theUser, False)

createAll()

