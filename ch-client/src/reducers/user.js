import {ACTIONS} from '../actions';

const defaultState = {
    userID: 0,
    name: "",
    token: "",
    loggedIn: false,
}

const user = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                userID: action.payload.id,
                name: action.payload.name,
                token: action.payload.token,
                loggedIn: true
            }

        case ACTIONS.LOGOUT:
            return {
                ...state,
                name: "",
                token: "",
                loggedIn: false 
            }
        default:
            return state;
    }
}

export default user
