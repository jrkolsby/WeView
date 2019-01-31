import {ACTIONS} from '../actions';

const defaultState = {
    userID: -1,
    username: "",
    token: "",
    loggedIn: false,
}

const user = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.LOGIN:
            return {
                ...state,
                loggedIn: true,
                userID: action.payload.user,
                token: action.payload.token,
                username: action.payload.username,
            }

        case ACTIONS.LOGOUT:
            return defaultState

        default:
            return state;
    }
}

export default user
