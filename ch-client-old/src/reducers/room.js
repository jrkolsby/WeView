import {ACTIONS} from '../actions';

let defaultState = {
    roomID: "",
    users: []
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.JOIN_SUCCESS:
            return {
                ...state,
            }

        default:
            return state
    }
}

export default reducer
