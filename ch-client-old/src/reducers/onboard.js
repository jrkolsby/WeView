import {ACTIONS} from '../actions';

let defaultState = {
    atSignup: false,
    atLogin: true
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                atSignup: false,
                atLogin: false
            }

        case ACTIONS.OPEN_ONBOARD:
            return {
                ...state,
                atSignup: action.payload,
                atLogin: !action.payload 
            }

        case ACTIONS.CLOSE_ONBOARD:
            return {
                ...state,
                atSignup: false,
                atLogin: false, 
            }
 
        default:
            return state
    
    }
}

export default reducer
