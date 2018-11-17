import ACTIONS from '.'

import {socket, request} from './server'

import {error} from './nav'

export const shuffleChoice = () => {
    return request({
        type: ACTIONS.REQUEST_SHUFFLE_CHOICE 
    }, (res) => {
        return {
            type: ACTIONS.SOCKET_UPDATE_CHOICE,
            payload: res.payload
        }
    }, error)
}

export const updateSuggestions = (value) => {
    return {
        type: ACTIONS.UPDATE_SUGGESTIONS,
        payload: value
    }
}

export const updateChoice = (id, newValue) => {
    return socket({
        type: ACTIONS.SOCKET_UPDATE_CHOICE,
        payload: {
            id: newValue
        }
    })
}

export const createRoom = (id, name) => {
    return request({
        type: ACTIONS.CREATE_ROOM,
        payload: { id, name }
    })
}

export const addChoice = (id=-1, user, title) => {
    return socket({
        type: ACTIONS.SOCKET_ADD_CHOICE,
        payload: { id, user, title }
    })
}

export const addVote = (matchID, voteA) =>{
    return socket({
        type: ACTIONS.SOCKET_ADD_VOTE,
        payload: {
            matchID,
            voteA 
        }
    })
}
