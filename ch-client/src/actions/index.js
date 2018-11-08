export const ACTIONS = {
    "START_GAME": 0,
    "JOIN_GAME": 1,
    "ADD_CHOICE": 2,
    "VOTE_CHOICE": 3,
    "LOGIN": 4,
    "SIGNUP": 5,
}

export const openSignup = () => {
    return {
        type: ACTIONS.SIGNUP,
        payload: true
    }
}

export const openLogin = () => {
    return {
        type: ACTIONS.SIGNUP
    }

}

export const startGame = (username, token, content) => {
    return {
        type: ACTIONS.START_GAME,
        payload: {
            username,
            token,
            content
        }
    }
}
