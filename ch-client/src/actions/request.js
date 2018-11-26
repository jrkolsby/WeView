import req from 'superagent'

import {ACTIONS} from '.'
import {showLoading, showError, showSuccess} from './nav'

export const SERVER = "http://localhost:5000"
export const SERVER_REQUEST = SERVER + "/api"

export const request = (action, success=showSuccess, error=showError) => {
    return (dispatch, getState) => {
        dispatch(showLoading(1))
        console.log(action)
		req.post(SERVER_REQUEST)
            .send({
                type: action.type,
                list: getState().list.listID,
                user: getState().user.userID,
                token: getState().user.token,
                payload: action.payload ? action.payload : {}
            }) 
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
                                // TODO: Implement reject!
                                dispatch(error(res.body.payload))
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
