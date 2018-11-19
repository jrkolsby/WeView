import ACTIONS from '.'

import { request } from './request'

export const signup = (user, pass) => {
    return request({
        type: ACTIONS.SIGNUP,
        payload: {
            user,
            pass 
        }
    })
}

export const login = (user, pass) => {
    return request({
        type: ACTIONS.LOGIN,
        payload: {
            user,
            pass 
        }
    })
}

export const logout = () => {
    return request({
        type: ACTIONS.LOGOUT
    })
}
