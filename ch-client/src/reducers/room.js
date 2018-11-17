import {ACTIONS} from '../actions';

const defaultState = {
    id: 0,
    choiceSuggestions: {
        199: {
            title: "The Royal Tennenbaums",
            user: "Steve Buschemi",
        }, 
        232: {
            title: "The Royal Tennenbaums",
            user: "Rose Meriam",
        }, 
    },
    choices: {
        1: {
            title: "The Royal Tennenbaums",
            user: "Rose Meriam",
        },
        2: {
            title: "Moonrise Kingdom",
            user: "India Chai",
        },
        3: {
            title: "The Life Aquatic",
            user: "James Kolsby",
        }},
    matches: {
        123: [1,3],
        322: [3,2]
    },
    users: [{
        name: "James Kolsby",
    }],
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

        default:
            return state;
    }
}

export default room
