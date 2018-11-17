import {ACTIONS} from '../actions';

const defaultState = {
    id: 0,
    name: "John Doe",
    token: "axys",
    tempUser: true,
}

const user = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                name: action.payload.name,
                pass: action.payload.pass,
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
