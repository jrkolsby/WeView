import {ACTIONS} from '../actions';

const defaultState = {
    inputValue: "",
    choiceSuggestions: [],
    choices: [],
    users: [],
    title: "",
    link: "",
}

const game = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.SERVER_SUCCESS:
            return {
                ...state,
                inputValue: action.payload
            }

        case ACTIONS.SERVER_ADD:
            return {
                ...state,
                choices: [...state.choices, action.payload]
            }

        case ACTIONS.UPDATE_CHOICE:
            return {
                ...state,
                inputValue: action.payload 
            }

        case ACTIONS.VOTE:
            return {
                ...state, 
            }

        default:
            return state;
    }
}

export default game
