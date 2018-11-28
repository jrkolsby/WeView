import ACTIONS from '.'

import { request } from './request'

export const signup = (user="", pass="") => {
    return request({
        type: ACTIONS.SIGNUP,
        payload: {
            user,
            pass 
        }
    }, (token) => {
        return {
            type: ACTIONS.LOGIN,
            payload: {
                username: user,
                user: token.user,
                token: token.token,
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
    }, (token) => {
        return {
            type: ACTIONS.LOGIN,
            payload: {
                username: user,
                user: token.user,
                token: token.token,
            }
        }
    })
}

export const logout = () => {
    console.log("LOGOUT")
    return request({
        type: ACTIONS.LOGOUT
    }, () => {
        return {
            type: ACTIONS.LOGOUT 
        } 
    })
}
