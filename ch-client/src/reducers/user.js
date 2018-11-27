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
            console.log(action.payload)
            return {
                ...state,
                loggedIn: true,
                userID: action.payload.user,
                token: action.payload.token,
                username: action.payload.username,
            }

        case ACTIONS.LOGOUT:
            return {
                ...state,
                loggedIn: false, 
                token: "",
                userID: 0,
                username: "",
            }

        default:
            return state;
    }
}

export default user
