import ACTIONS from '.'

import { request } from './request'

export const createChoice = () => {
    return request({
        type: ACTIONS.CREATE_CHOICE,
    }, (choice) => {
        return {
            type: ACTIONS.CREATE_CHOICE, 
            payload: choice
        }
    })
}

// Sends the current vote and receives a new vote
export const createVote = (index=-1, vote=-1) => {
    return request({
        type: ACTIONS.CREATE_VOTE,
        payload: { vote, index }
    }, () => {
	return {
	    type: ACTIONS.NOACTION
	}
    })
}

export const updateChoice = (id, title) => {
    return request({
        type: ACTIONS.UPDATE_CHOICE,
        payload: { id, title }
    }, (choice) => {
        return {
            type: ACTIONS.UPDATE_CHOICE,
            payload: choice
        }
    })
}

export const joinList = (url) => {
    return request({
        type: ACTIONS.JOIN_LIST,
        payload: { url }
    }, (list) => {
        return {
            type: ACTIONS.JOIN_LIST,
            payload: list
        }
    })
}

export const createList = (title) => {
    return request({
        type: ACTIONS.CREATE_LIST,
        payload: { title }
    }, (list) => {
        return {
            type: ACTIONS.JOIN_LIST,
            payload: list
        }
    })
}
