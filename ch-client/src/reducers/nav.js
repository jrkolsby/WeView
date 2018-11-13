import {ACTIONS} from '../actions';

const defaultState = {
    index: 0,
    history: [],
    title: "Hello World",
    pageTitle: "Input Users!",
    subtitle: "This is an app"
}

const nav = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.NAVIGATE:
            return {
                ...state,
                index: action.payload 
            }
        default:
            return state
    }
}

export default nav
