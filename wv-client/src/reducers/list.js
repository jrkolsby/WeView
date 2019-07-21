import {ACTIONS} from '../actions';
import defaultState from './landing'

const list = (state=defaultState, action) => {
    switch(action.type) {

	case ACTIONS.EDIT_CHOICE:
	    return {
		...state,
		editing: action.payload,
	    }

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

        case ACTIONS.UPDATE_BRACKET:
            return {
                ...state,
                bracket: action.payload,
            }

        case ACTIONS.UPDATE_RESULTS:
            return {
                ...state,
		results: action.payload,
            }

        case ACTIONS.UPDATE_VOTE:
            return {
                ...state,
		votes: {
		    ...state.votes,
		    [action.payload.index]: action.payload.vote
		}
            }

        case ACTIONS.UPDATE_ROUND:
	    console.log(action.payload)
            return {
                ...state,
		round: action.payload,
		editing: -1,
		votes: {},
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
		round: action.payload.round,
                bracket: action.payload.bracket,  
		results: action.payload.results,
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
	    return defaultState

        default: return state;
    }
}

export default list
