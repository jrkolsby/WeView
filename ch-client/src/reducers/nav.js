import {ACTIONS} from '../actions';

const defaultState = {
    page: 1,
    modal: 1,
    history: [0, 1],
    title: "Choosy",
    subtitle: "Decide with friends",
    navTitle: "Add some movies!",
    loading: false,
    room: 0
}

const nav = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.OPEN_MODAL:
            return {
                ...state,
                modal: action.payload 
            }

        case ACTIONS.IS_LOADING:
            return {
                ...state,
                loading: action.payload 
            }

        case ACTIONS.NAVIGATE:
            return {
                ...state,
                page: action.payload 
            }

        default:
            return state
    }
}

export default nav
