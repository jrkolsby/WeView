import ACTIONS from '.'

import { request } from './request'

export const signup = (user="", pass="") => {
    return request({
        type: ACTIONS.SIGNUP,
        payload: {
            user,
            pass 
        }
    }, (creds) => {
        return {
            type: ACTIONS.LOGIN,
            payload: {
                id: creds.id,
                username: user,
                token: creds.token
            }
        }
    })
}

export const login = (user="", pass="") => {
    return request({
        type: ACTIONS.LOGIN,
        payload: {
            user,
            pass 
        }
    }, (creds) => {
        return {
            type: ACTIONS.LOGIN,
            payload: {
                id: creds.id,
                username: user,
                token: creds.token
            }
        }
    })
}

export const logout = () => {
    return request({
        type: ACTIONS.LOGOUT
    }, () => {
        return {
            type: ACTIONS.LOGOUT 
        } 
    })
}
