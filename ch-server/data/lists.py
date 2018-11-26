from data import Base, session, createAll
from data import Column, Integer, String, Boolean, UniqueConstraint

class List(Base):
    __tablename__ = 'lists'

    id = Column('id', Integer, primary_key=True)
    url = Column('url', String)
    title = Column('title', String)

    bracket = Column('bracket', String)

    def __init__(self, title):
        self.title = title
        self.url = title.replace(" ", "").lower()
        session.add(self)
        session.commit()

class ListUser(Base):
    __tablename__ = 'list_users'

    id = Column('id', Integer, primary_key=True)
    theList = Column('theList', Integer)
    user = Column('user', Integer)
    owner = Column('owner', Boolean)

    def __init__(self, theList, user, owner):
        self.user = user.id
        self.theList = theList.id
        self.owner = owner
        session.add(self)
        session.commit()

class ListChoice(Base):
    __tablename__ = 'list_choices'

    id = Column('id', Integer, primary_key=True)
    theList = Column('theList', Integer)
    choice = Column('choice', Boolean)

    def __init__(self, theList, choice, user):
        self.choice = user.id
        self.theList = theList.id
        self.owner = owner
        session.add(self)
        session.commit()

def addList(title, owner):
    theList = List(title)
    member = ListUser(theList, owner, True)
    return theList

def getList(id=None, title=None, url=None):
    if id is not None:
        return session.query(List).get(id) 

    titleFilter = (True)
    urlFilter = (True)

    if title is not None:
        titleFilter = (List.title == title)

    if url is not None:
        urlFilter = (List.url == url)

    theList = session.query(List) \
        .filter(titleFilter) \
        .filter(urlFilter) \
        .first()

    return theList

def addListUser(theList, theUser):
    return ListUser(theList, theUser, False)

def addListChoice(theList, theChoice):
    return ListChoice(theList, theChoice)

createAll()
