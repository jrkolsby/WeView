import {ACTIONS} from '../actions';

const defaultState = {
    currentPage: 0,
    currentModal: 0,

    pageTitle: "Choosy",
    pageSubtitle: "Decide with friends",
    navTitle: "Add some movies!",

    progress: 0,
    messages: []
}

const nav = (state=defaultState, action) => {
    switch(action.type) {
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
                currentPage: action.payload 
            }

        case ACTIONS.SHOW_LOADING:
            return {
                ...state,
                progress: action.payload 
            }

        case ACTIONS.SHOW_SUCCESS:
            return {
                ...state, 
                messages: [
                    ...state.messages,
                    action
                ]
            }

        case ACTIONS.SHOW_ERROR:
            return {
                ...state, 
                messages: [
                    ...state.messages,
                    action
                ]
            }

        default:
            return state
    }
}

export default nav
