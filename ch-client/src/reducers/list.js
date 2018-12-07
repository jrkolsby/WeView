import {ACTIONS} from '../actions';
import testState from './test'

const defaultState = {
    listID: -1,
    round: 0,
    editing: -1,
    choices: {},
    users: {},
    votes: {},
    bracket: [],
    results: []
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

        // Sets the user's current option
        case ACTIONS.UPDATE_ROUND:
            return {
                ...state,
		round: action.payload
            }

        // Adds a vote from the room
        case ACTIONS.UPDATE_VOTE:
	    console.log('update vote', action);
            return {
                ...state,
                votes: {
                    ...state.votes,
                    [action.payload.id]: {
                        index: action.payload.index,
                        vote: action.payload.vote
                    }
                }
            }

        case ACTIONS.UPDATE_BRACKET:
            console.log('update bracket', action)
            return {
                ...state,
                bracket: action.payload.bracket,
		results: action.payload.results,
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
            return {
                ...state,
                listID: action.payload.id,
		round: 0,
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

        case ACTIONS.LOGOUT:
            return testState

        default: return state;
    }
}

export default list
