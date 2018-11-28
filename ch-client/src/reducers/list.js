import {ACTIONS} from '../actions';
import testState from './test'

const defaultState = {
    listID: -1,
    editing: -1,
    choices: {},
    users: {},
    votes: [],
    bracket: []
}

const list = (state=testState, action) => {
    switch(action.type) {
        case ACTIONS.CREATE_CHOICE: 
            return {
                ...state,
                editing: action.payload.id,
                choices: {
                    ...state.choices,
                    [action.payload.id]: {
                        user: action.payload.user,
                        title: action.payload.title
                    }
                }
            }

        case ACTIONS.UPDATE_CHOICE: 
            return {
                ...state,
                choices: {
                    ...state.choices,
                    [action.payload.id]: {
                        user: action.payload.user,
                        title: action.payload.title
                    }
                }
            }

        case ACTIONS.UPDATE_USER:
            console.log('update user', action)
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.id]: {
                        name: action.payload.name,
                    }
                }
            }

        case ACTIONS.JOIN_LIST:
            console.log('join list', action)
            return {
                ...state,
                listID: action.payload.id,
                bracket: action.payload.bracket,  
                users: action.payload.users.reduce((d, u) => {
                    d[u.id] = { name: u.name }
                    return d
                }, {}),
                choices: action.payload.choices.reduce((d, c) => {
                    d[c.id] = { title: c.title, user: c.user }
                    return d
                }, {}),
            }
        

        case ACTIONS.ADD_VOTE:
            return {
                ...state, 
                votes: {
                    ...state.choices,
                    [action.payload.id]: action.payload 
                }
            }

        case ACTIONS.LOGOUT:
            return testState

        default: return state;
    }
}

export default list
