import req from 'superagent'

import {ACTIONS} from '.'
import {showLoading, showError, showSuccess} from './nav'

export const SERVER = "http://localhost:5000"
export const SERVER_REQUEST = SERVER + "/api"

export const request = (action, success=showSuccess, error=showError) => {
    return (dispatch, getState) => {
        dispatch(showLoading(1))
		req.post(SERVER_REQUEST)
            .send({
                ...action,
                list: getState().nav.list,
                user: getState().user.name,
                token: getState().user.token,
            }) 
            .type("form")
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
                                dispatch(error(res.body.payload))
                                break;
                            
                            case ACTIONS.REQUEST_ERROR:
                                dispatch(error(res.body.payload))
                                break;

                            default: break;
                        }
                    }
                }
            })
    }
}
