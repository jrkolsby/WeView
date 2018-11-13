import request from 'superagent'

const API_URL = "http://localhost:5000/api/"
const USER_URL = API_URL + "user"
const GAME_URL = API_URL + "game"

const callAPI = (endpoint, action, successCreator, errorCreator) => {
    return (dispatch, getState) => {
		dispatch(action) // Dispatch local action
		request.post(endpoint)
            .send({
                ...action,
                user: getState().user.name,
                token: getState().user.token
            }) 
            .type("form")
			.end((err, res) => {
                console.log(res.body)
                /*
                if (err) { dispatch(errorCreator(err.body)) }
                else { dispatch(successCreator(res.body)) }
                */
            })
    }
}

export const socketAPI = (action) => {
    return (dispatch, getState) => {
        dispatch({
            ...action,
            user: getState().user.name,
            token: getState().user.token
        }) 
    }
}

export const gameAPI = (action, successCreator, errorCreator) => {
    return callAPI(GAME_URL, action, successCreator, errorCreator)
}

export const userAPI = (action, successCreator, errorCreator) => {
    return callAPI(USER_URL, action, successCreator, errorCreator)
}
