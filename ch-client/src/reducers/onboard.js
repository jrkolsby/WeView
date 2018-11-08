import {ACTIONS} from '../actions';

let defaultState = {
    signup: true,
    login: false
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.LOADING:
            return {
                ...state,

                loading: action.payload
            
            }

        case ACTIONS.OPEN_ONBOARD:
            return {
                ...state,

                signup: action.payload,
                login: !action.payload 
            }

        case ACTIONS.CLOSE_ONBOARD:
            return {
                ...state,

                signup: false,
                login: false, 
            }
 
        default:
            return state
    
    }
}

export default reducer
