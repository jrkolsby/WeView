import ACTIONS from '.'

import {gameAPI, socketAPI} from './api'

export const updateSuggestions = (suggestions) => {
    return {
        type: ACTIONS.UPDATE_SUGGESTIONS,
        payload: suggestions
    }
}

export const updateChoice = (value) => {
    return {
        type: ACTIONS.UPDATE_CHOICE,
        payload: value
    }
}

export const getSuggestions = (value) => {
    return gameAPI(updateChoice(value), 
                   updateSuggestions, 
                   displayError)
}

export const addChoice = (name) => {
    return socketAPI({
        type: ACTIONS.SERVER_ADD,
        payload: name
    })
}

export const displayError = (err) => {
    return {
        type: ACTIONS.ERROR
    }
}

export const loadGame = () => {
    return {
        type: ACTIONS.LOADING
    }
} 
