import ACTIONS from '.'

import { request } from './request'

export const createChoice = (title="") => {
    return request({
        type: ACTIONS.CREATE_CHOICE,
        payload: { title }
    }, (choice) => {
        return {
            type: ACTIONS.CREATE_CHOICE, 
            payload: {
                id: choice.id,
                user: choice.user,
                title: choice.title
            }
        }
    })
}

export const readChoices = (list) => {
    return request({
        type: ACTIONS.READ_CHOICES
    })
}

export const updateChoice = (id, title) => {
    return request({
        type: ACTIONS.UPDATE_CHOICE,
        payload: { id, title }
    })
}

export const joinList = (url) => {
    return request({
        type: ACTIONS.JOIN_LIST,
        payload: { url }
    }, (list) => {
        return {
            type: ACTIONS.JOIN_LIST,
            payload: {
                url,
                id: list.id,
                title: list.title
            }
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
            payload: {
                title,
                id: list.id,
                url: list.url,
            }
        }
    })
}

export const createVote = (choice) =>{
    return request({
        type: ACTIONS.CREATE_VOTE,
        payload: { choice }
    })
}
