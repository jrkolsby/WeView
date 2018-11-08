import { ACTIONS } from '../actions';

let defaultState = {
    signup: false,
    login: true
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case ACTIONS.TOGGLE_REPEAT:
            return {
                ...state,

                repeatChunks: !state.repeatChunks
            }
        
        default:
            return state
    
    }
}

export default reducer
