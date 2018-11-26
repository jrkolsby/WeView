import {ACTIONS} from '../actions';

const defaultState = {
    userID: 0,
    username: "",
    token: "",
    loggedIn: false,
}

const user = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.LOGIN:
            return {
                ...state,
                userID: action.payload.id,
                username: action.payload.username,
                token: action.payload.token,
                loggedIn: true
            }

        case ACTIONS.LOGOUT:
            return {
                ...state,
                userID: 0,
                username: "",
                token: "",
                loggedIn: false 
            }

        default:
            return state;
    }
}

export default user
