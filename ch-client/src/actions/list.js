import ACTIONS from '.'

import { request } from './request'

export const createChoice = (title) => {
    return request({
        type: ACTIONS.CREATE_CHOICE,
        payload: { title }
    })
}

export const readChoices = (query) => {
    return request({
        type: ACTIONS.READ_CHOICES,
        payload: { query } 
    })
}

export const updateChoice = (id, newValue) => {
    return request({
        type: ACTIONS.UPDATE_CHOICE,
        payload: { id, newValue }
    })
}

export const createList = (name) => {
    return request({
        type: ACTIONS.CREATE_LIST,
        payload: { name }
    })
}

export const createVote = (choice) =>{
    return request({
        type: ACTIONS.CREATE_VOTE,
        payload: { choice }
    })
}
