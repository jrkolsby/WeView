import request from 'superagent'

import {ACTIONS} from '.'

const LOGIN_URL = "http://localhost:5000/login"
const SIGNUP_URL = "http://localhost:5000/signup"

export const signup = (user, pass) => {
    return (dispatch, getState) => {
		dispatch(loading(true))
		dispatch(attemptUser(true))
		request
			.post(SIGNUP_URL)
            .type('form')
            .send({user, pass})
			.then((res) => {
				dispatch(loading(false))
				dispatch(res.body) 
                console.log(res.body)
            }) 
    }
}

export const login = (user, pass) => {
    return (dispatch, getState) => {
		dispatch(loading(true))
        dispatch(attemptUser(user))
		request
			.post(LOGIN_URL)
            .type('form')
            .send({user, pass})
			.then((res) => {
				dispatch(loading(false))
				dispatch(res.body) 
                console.log(res.body)
            }) 
    }
}

export const attemptUser = (user) => {
    return {
        type: ACTIONS.ATTEMPT_USER,
        payload: user
    }
}

export const loading = (done) => {
    return {
        type: ACTIONS.LOADING,
        payload: done
    }
}

export const error = (msg) => {
    return {
        type: ACTIONS.ERROR,
        payload: msg 
    }
} 
