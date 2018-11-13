import {ACTIONS} from '../actions';

const defaultState = {
    name: "",
    token: "",
    tempUser: true,
}

const user = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                name: action.payload.name,
                token: action.payload.token,
                tempUser: false
            }

        case ACTIONS.LOGOUT:
            return {
                ...state,
                name: "",
                token: "",
                tempUser: true 
            }
        default:
            return state;
    }
}

export default user
