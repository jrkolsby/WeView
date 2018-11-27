import ACTIONS from '.'

import { request } from './request'

export const createChoice = () => {
    return request({
        type: ACTIONS.CREATE_CHOICE,
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

export const updateChoice = (id, title) => {
    return request({
        type: ACTIONS.UPDATE_CHOICE,
        payload: { id, title }
    }, (choice) => {
        return {
            type: ACTIONS.UPDATE_CHOICE,
            payload: { 
                id: choice.id, 
                user: choice.user,
                title: choice.title 
            }
        }
    })
}

export const joinList = (url) => {
    return request({
        type: ACTIONS.JOIN_LIST,
        payload: { url }
    }, (list) => {
        console.log(list)
        return {
            type: ACTIONS.JOIN_LIST,
            payload: {
                url,
                id: list.id,
                title: list.title,
                users: list.users,
                choices: list.choices
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
                users: list.users,
                choices: []
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
