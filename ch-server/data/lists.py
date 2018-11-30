import re
import json

from data import Base, session, createAll
from data import Column, Integer, String, Boolean, UniqueConstraint

from data.users import getUser
from data.choices import getChoice

BRACKET_SIZE = 16

class List(Base):
    __tablename__ = 'lists'
    __table_args__ = (
        UniqueConstraint("url"),
    )

    id = Column('id', Integer, primary_key=True)
    url = Column('url', String)
    title = Column('title', String)
    bracket = Column('bracket', String)

    def __init__(self, title):
        self.title = title
        self.bracket = json.dumps([[]]*BRACKET_SIZE)
        self.url = makeURL(title)
        session.add(self)
        session.commit()

    def toDict(self):
        return {
            "choices": map(lambda c: c.toDict(), self.getChoices()),
            "votes": map(lambda v: v.toDict(), self.getVotes()),
            "users": map(lambda u: u.toDict(), self.getUsers()),
            "bracket": json.loads(self.bracket),
            "title": self.title,
            "url": self.url,
            "id": self.id,
        }

    def getUsers(self, user=None):
        listUsers = session.query(ListUser) \
            .filter(ListUser.theList == self.id) \
            .filter((ListUser.user == user.id) if \
                (user is not None) else (True)).all()
        return map(lambda j: getUser(id=j.user), listUsers)

    def getVotes(self, index=None):
        return session.query(ListVote) \
            .filter(ListVote.theList == self.id) \
            .filter((ListVote.index == index) if \
                (index is not None) else (True)).all()

    def getChoices(self, id=None):
        listChoices = session.query(ListChoice) \
            .filter(ListChoice.theList == self.id) \
            .filter((ListChoice.id == id) if \
                (id is not None) else (True)).all()
        return map(lambda j: getChoice(id=j.choice), listChoices)

    def getBracket(self):
        choices = self.getChoices()

        bracket = []
        matchIndex = BRACKET_SIZE-1

        for i in range(BRACKET_SIZE):
            bracket.append([])

        for i in range(len(choices)):
            if len(bracket[matchIndex]) == 2:
                matchIndex -= 1
            if matchIndex < (BRACKET_SIZE/2):
                break;
            bracket[matchIndex].append(choices[i].id)

        bracket[0] = [getWinner(bracket, 1)]

        self.bracket = json.dumps(bracket)
        session.commit()

        return bracket

def getWinner(bracket, index):
    match = bracket[index]

    if index < BRACKET_SIZE / 2:
        a = getWinner(bracket, index*2)
        b = getWinner(bracket, index*2+1)
        if a is not None:
            match.append(a)
        if b is not None:
            match.append(b)

    if len(match) > 0:
        # calculate votes
        return match[0]

    return None

# JOIN LIST and USER
class ListUser(Base):
    __tablename__ = 'list_users'
    __table_args__ = (
        UniqueConstraint('list','user'),
    )

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    owner = Column('owner', Boolean)
    theList = Column('list', Integer)

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
    vote = Column('vote', Boolean)
    index = Column('index', Integer)
    theList = Column('list', Integer)

    __table_args__ = (
        UniqueConstraint('user', 'index', 'list'),
    )

    def __init__(self, theList, user, index, vote):
        self.theList = theList.id
        self.user = user.id
        self.index = index
        self.vote = vote
        session.add(self)
        session.commit()

    def toDict(self):
        return {
            "votes": map(lambda v: v.toDict(), getVotes()),
        }

# JOIN LIST and CHOICE
class ListChoice(Base):
    __tablename__ = 'list_choices'

    id = Column('id', Integer, primary_key=True)
    user = Column('user', Integer)
    choice = Column('choice', Integer)
    theList = Column('list', Integer)

    def __init__(self, theList, user, choice):
        self.theList = theList.id
        self.choice = choice.id
        self.user = user.id
        session.add(self)
        session.commit()

def makeURL(title):
    return re.sub('[\W_]+', '', title.lower())

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

def nextSize(x):  
    return 1 if x == 0 else 2**(x - 1).bit_length()

def addListChoice(theList, theChoice, theUser):
    # ADD choice to list
    newChoice = ListChoice(theList, theUser, theChoice)

def addListVote(theList, theUser, theIndex, theVote):
    # ADD vote to list
    vote = ListVote(theList, theUser, theIndex, theVote)

def addListUser(theList, theUser):
    if len(theList.getUsers(user=theUser)) == 0:
        return ListUser(theList, theUser, False)
    return None

createAll()

