import {ACTIONS} from '../actions';

let defaultState = {
    user: "",
    token: ""
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state
    }
}

export default reducer
