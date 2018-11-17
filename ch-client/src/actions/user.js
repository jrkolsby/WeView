import ACTIONS from '.'

import {request} from './server'
import {navigateTo, error} from './nav'

export const signup = (user, pass) => {
    return request({
        type: ACTIONS.SIGNUP,
        payload: {
            user,
            pass 
        }
    }, (success) => {
        return navigateTo(1)
    }, error)
}

export const login = (user, pass) => {
    return request({
        type: ACTIONS.LOGIN,
        payload: {
            user,
            pass 
        }
    }, (success) => {
        return navigateTo(1)
    }, error)
}

export const logout = () => {
    return request({
        type: ACTIONS.LOGOUT
    }, (success) => {
        return navigateTo(1)
    }, error)
}
