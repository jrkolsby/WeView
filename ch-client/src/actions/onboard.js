import {ACTIONS} from '.'
import request from 'superagent'

const LOGIN_URL = "http://localhost:5000/login"
const SIGNUP_URL = "http://localhost:5000/signup"

export const loading = (done) => {
    return {
        type: ACTIONS.LOADING,
        payload: done
    }
}

export const signup = (user, pass) => {
    return (dispatch, getState) => {
		dispatch(loading(true))
		request
			.post(SIGNUP_URL)
            .send({user, pass})
			.then((res) => {
				dispatch(loading(false))
				dispatch(res.body) 
            }) 
    }
}

export const login = (user, pass) => {
    return (dispatch, getState) => {
		dispatch(loading(true))
		request
			.post(LOGIN_URL)
			.then((res) => {
				dispatch(loading(false))
				dispatch(res.body) 
            }) 
    }
}

export const closeOnboard = (verified) => {
    return {
        type: ACTIONS.CLOSE_ONBOARD,
        payload: verified
    }
}

export const openOnboard = (signup) => {
    return {
        type: ACTIONS.OPEN_ONBOARD,
        payload: signup
    }
}

export const startGame = (username, token, content) => {
    return {
        type: ACTIONS.START_GAME,
        payload: {
            username,
            token,
            content
        }
    }
}
