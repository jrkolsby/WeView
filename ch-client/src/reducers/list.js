import {ACTIONS} from '../actions';

const defaultState = {
    list: 0,
    choices: {
        1: {
            title: "The Royal Tennenbaums",
            user: 1
        },
        2: {
            title: "Moonrise Kingdom",
            user: 2
        },
        3: {
            title: "The Life Aquatic",
            user: 2
        }},
    users: {
        1: {
            name: "James Kolsby"  
        },
        2: {
            name: "India Chai"  
        }
    
    },
}

const room = (state=defaultState, action) => {
    switch(action.type) {
        case ACTIONS.REQUEST_SUCCESS:
            return {
                ...state,
            }

        case ACTIONS.SERVER_ADD:
            return {
                ...state,
                choices: [...state.choices, action.payload]
            }

        case ACTIONS.SOCKET_ADD_CHOICE: 
            console.log('socket add choice', action)
            return {
                ...state,
                choices: {
                    ...state.choices,
                    [action.payload.id]: {
                        user: action.payload.user,
                        title: action.payload.title
                    }
                }
            }

        case ACTIONS.UPDATE_CHOICE: 
            return {
                ...state,
                choices: {
                    ...state.choices,
                    [action.payload.id]: action.payload.name
                }
            }
            

        case ACTIONS.ADD_VOTE:
            return {
                ...state, 
                votes: {
                    ...state.choices,
                    [action.payload.id]: action.payload 
                }
            }

        default: return state;
    }
}

export default room
