import {ACTIONS} from '../actions';

let defaultState = {
    ok: true,
    loading: false,
    error: ""
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                ok: true,
                loading: false,
                error: ""
            }

        case ACTIONS.ERROR:
            return {
                ...state, 
                ok: false,
                error: action.payload
            }

        case ACTIONS.LOADING:
            return {
                ...state,
                loading: action.payload 
            }

        default:
            return state
    }
}

export default reducer
