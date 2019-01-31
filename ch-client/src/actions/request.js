import req from 'superagent'

import {ACTIONS} from '.'
import {showLoading, showError, showReject, showSuccess} from './nav'

export const SERVER = "/api/"

export const attachCreds = (action, state) => {
    return {
        type: action.type,
        list: state.list.listID,
        user: state.user.userID,
        token: state.user.token,
        payload: action.payload ? action.payload : ""
    }
}

export const request = (action, success=showSuccess, error=showError, reject=showReject) => {
    return (dispatch, getState) => {
        dispatch(showLoading(1))
		req.post(SERVER)
            .send(attachCreds(action, getState())) 
            .set('Accept', 'application/json')
			.end((err, res) => {
                dispatch(showLoading(0))
                if (err) {
                    alert(err) 
                } else { 
                    if (res.body &&
                        res.body.type &&
                        res.body.payload) { 
                        switch(res.body.type) {
                            case ACTIONS.REQUEST_SUCCESS:
                                dispatch(success(res.body.payload)) 
                                break;

                            case ACTIONS.REQUEST_REJECT:
                                dispatch(reject(res.body.payload))
                                break;
                            
                            case ACTIONS.REQUEST_ERROR:
                                dispatch(error(res.body.payload))
                                break;

                            default: break;
                        }
                    }
                }
            }
        )
    }
}
