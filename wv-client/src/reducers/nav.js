import {ACTIONS} from '../actions';

const defaultState = {
    currentPage: 0,
    currentModal: 0,

    pageTitle: "WeView",
    pageSubtitle: "Pick a movie with friends!",
    navTitle: "Choosing with",

    progress: 0,
    messages: []
}

const nav = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                messages: [],
                currentModal: 4,
            }

        case ACTIONS.LOGOUT:
            return defaultState

        case ACTIONS.UPDATE_ROUND:
	    return {
		...state,
                currentModal: 0,
		currentPage: 0,
		navTitle: action.payload.length === 4 ? "Second round" :
		    action.payload.length === 2 ? "Third round" :
		    action.payload.length === 1 ? "Final round" : ""
	    }

        case ACTIONS.JOIN_LIST:
            return {
                ...state,
                currentModal: 0,
		currentPage: 0,
                messages: [],
                pageTitle: action.payload.title,
                pageSubtitle: "chsy.io/" + action.payload.url,
            }

        case ACTIONS.GOTO_MODAL:
            return {
                ...state,
                currentModal: 
                    state.currentModal === action.payload ? 0 :
                    action.payload
            }

        case ACTIONS.GOTO_PAGE:
            return {
                ...state,
                currentPage: action.payload,
                navTitle: action.payload === 1 ? "Voting with" : "Choices by"
            }

        case ACTIONS.SHOW_LOADING:
            return {
                ...state,
                progress: action.payload 
            }

        case ACTIONS.SHOW_SUCCESS:
	    let time = (new Date()).getTime();
            return {
                ...state, 
                messages: [
                    ...state.messages,
		    {
			...action,
			time
		    }
                ]
            }

        case ACTIONS.SHOW_ERROR:
	    time = (new Date()).getTime();
            return {
                ...state, 
                messages: [
                    ...state.messages,
		    {
			...action,
			time
		    }
                ]
            }
	
	case ACTIONS.SHOW_REJECT:
	    time = (new Date()).getTime();
	    return {
		...state,
		messages: [
		    ...state.messages,
		    {
			...action,
			time
		    }
		]
	    }

        default:
            return state
    }
}

export default nav
